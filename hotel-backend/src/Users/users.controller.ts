import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { retry } from 'rxjs';

@Controller('user')
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



