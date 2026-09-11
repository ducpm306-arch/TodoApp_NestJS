import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(user: User, dto: CreateOrderDto): Promise<Order> {
    const items: OrderItem[] = [];
    let totalPrice = 0;

    for (const line of dto.items) {
      const product = await this.productRepo.findOne({ where: { id: line.productId } });
      if (!product) throw new NotFoundException(`Không tìm thấy product id=${line.productId}`);
      if (product.stock < line.quantity) {
        throw new BadRequestException(`Sản phẩm "${product.name}" không đủ hàng`);
      }

      product.stock -= line.quantity;
      await this.productRepo.save(product);

      const item = new OrderItem();
      item.product = product;
      item.quantity = line.quantity;
      item.price = product.price;
      items.push(item);

      totalPrice += Number(product.price) * line.quantity;
    }

    const order = this.orderRepo.create({ user, items, totalPrice });
    return this.orderRepo.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.orderRepo.find();
  }

  findAllByUser(userId: number): Promise<Order[]> {
    return this.orderRepo.find({ where: { user: { id: userId } } });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException(`Không tìm thấy order id=${id}`);
    return order;
  }

  async update(id: number, dto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    order.status = dto.status;
    return this.orderRepo.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepo.remove(order);
  }
}