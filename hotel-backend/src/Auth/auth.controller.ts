import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import express from 'express';
import { use } from 'passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const { user, token } = await this.authService.register(dto);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 ditë
    });

    return {
      status: HttpStatus.CREATED,
      message: 'User registered successfully',
      user,
      token, // opsionale, mund ta dërgosh edhe ne response
    };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: express.Response) {
    res.clearCookie('jwt');
    return { message: 'Logged out successfully' };
  }

  @Post('login')
  async login(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const { user, token } = await this.authService.login(data);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return {
      status: HttpStatus.OK,
      message: 'Login successful',
      user: user,
      token,
    };


  }
}