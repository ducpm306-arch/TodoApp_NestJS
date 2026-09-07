import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'your-secret-key',
        });
    }

    async validate(payload: any) {
        const account = await this.authService.findById(payload.sub);
        if (!account) throw new UnauthorizedException();
        return { id: account.id, username: account.username, role: account.role };
    }
}