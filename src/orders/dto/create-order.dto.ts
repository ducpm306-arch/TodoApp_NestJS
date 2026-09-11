import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNumber, IsPositive, ValidateNested } from 'class-validator';

class OrderItemDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}