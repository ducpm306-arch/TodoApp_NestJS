import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { Account } from 'src/models/account.model';

@Module({
    imports: [
        TypeOrmModule.forFeature([Account]),
        PassportModule,
        JwtModule.register({
            secret: 'your-secret-key',
            signOptions: { expiresIn: 'id'},
        }),
    ],
})

export class AuthModule {}