import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { threadCpuUsage } from 'process';

@Injectable()
export class UsersService {
  
  
  
  constructor(@InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>) { }

  public async create(data: UserDto):Promise<UserEntity> {
    const newUser = await this.repository.create({
      name: data.name,
      email: data.email,
      password:data.password
    })
    return await this.repository.save(newUser);
  }

  public async findAll(): Promise<UserEntity[]> {
    return await this.repository.find();
  }

  public async findById(id: number): Promise<UserEntity > {
    const result = await this.repository.findOne({ where: { id } });
    if (!result) {
      throw new HttpException("This user does not exist!", HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async findByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
    // kthen null nëse nuk gjendet - jo exception!
  }

  public async updateUser(id: number, update: UpdateUserDto): Promise<UserEntity > {
    const result = await this.repository.update(id, update);
    return this.findById(id);
  }

  public async deleteUser(id: number) {
    return this.repository.delete(id);
  }

}
