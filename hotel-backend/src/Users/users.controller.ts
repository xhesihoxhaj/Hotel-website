import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../Auth/auth.guards';
import { RolesGuard } from '../Auth/roles.guard';
import { Roles } from '../Auth/roles.decorator';
import { UsersService } from './users.service';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { retry } from 'rxjs';

@Controller('user')
@UseGuards(AuthGuard, RolesGuard)
@Roles('admin')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('all')
  public async findAll() {
    return this.usersService.findAll()
  }
  
  @Get(':id')
  public async getById(@Param('id')id:number) {
    return await this.usersService.findById(id);
  }

  @Get('email')
  public async getEmail(@Param('email')email:string) {
    return this.usersService.findByEmail(email);
  }
  
  @Patch(':id')
  public async updateUser(@Param('id') id: number, @Body() update: UpdateUserDto) {
    return this.usersService.updateUser(id, update);
  }

}



