import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/Users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private repository: UsersService,
        private jwtService: JwtService,
    ) { }

    public async register(data: RegisterDto) {
   
        const existUser = await this.repository.findByEmail(data.email);
        if (existUser) {
            throw new ConflictException("This user already exists!");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

    
        const user = await this.repository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
        });

        if (!user) {
            throw new ConflictException('Registration failed');
        }

        const token = await this.jwtService.signAsync({
            sub: user.id,
            email: user.email,
            role: user.role
        });

        return {
            user: { id: user.id, name: user.name, email: user.email },
            token
        };
    }

    public async login(data: LoginDto) {
        const user = await this.repository.findByEmail(data.email);

       
        if (!user) {
            throw new UnauthorizedException("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid email or password");
        }

        const token = await this.jwtService.signAsync({
            sub: user.id,
            email: user.email,
            role: user.role
        });

        return {
            user: { id: user.id, name: user.name, email: user.email },
            token
        };
    }
}