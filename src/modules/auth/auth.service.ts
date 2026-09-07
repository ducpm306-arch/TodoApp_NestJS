import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Account } from 'src/models/account.model';
import { RegisterDto, LoginDto } from 'src/dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Account)
        private accountRepo: Repository<Account>,
        private jwtService: JwtService,
    ) {}

    async register(dto: RegisterDto): Promise<Account> {
        const existing = await this.accountRepo.findOneBy({username: dto.username});
        if (existing) throw new ConflictException('Username đã tồn tại');

        const hashed = await bcrypt.hash(dto.password, 10);
        const account = this.accountRepo.create({ username: dto.username, password: hashed});
        return this.accountRepo.save(account);
    }

    async login(dto: LoginDto): Promise<{ access_token: string }> {
        const account = await this.accountRepo.findOneBy({ username: dto.username });
        if (!account) throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');

        const match = await bcrypt.compare(dto.password, account.password);
        if (!match) throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');

        const payload = { sub: account.id, username: account.username, role: account.role };
        return { access_token: this.jwtService.sign(payload) };
    }

    async findById(id: number): Promise<Account | null> {
        return this.accountRepo.findOneBy({ id });
    }
}