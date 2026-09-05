import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        const token = request.cookies?.jwt || request.headers.authorization?.split(' ')[1];

        if (!token) throw new UnauthorizedException('Token mungon');

        try {
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get<string>('JWT_SECRET')
            });
            request.user = { id: payload.sub, email: payload.email, role: payload.role };
            return true;
        } catch {
            throw new UnauthorizedException('Token i pavlefshëm');
        }
    }
}