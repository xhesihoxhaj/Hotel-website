import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) return true;

        const request = context.switchToHttp().getRequest();

        // Lexo token-in dhe vendos request.user nëse nuk ekziston
        if (!request.user) {
            const token = request.cookies?.jwt || request.headers.authorization?.split(' ')[1];
            if (!token) throw new UnauthorizedException('Token mungon');
            try {
                const payload = this.jwtService.verify(token, {
                    secret: this.configService.get<string>('JWT_SECRET')
                });
                request.user = { id: payload.sub, email: payload.email, role: payload.role };
            } catch {
                throw new UnauthorizedException('Token i pavlefshëm');
            }
        }

        const user = request.user;
        if (!user || !roles.includes(user.role)) {
            throw new ForbiddenException('Nuk ke akses!');
        }
        return true;
    }
}