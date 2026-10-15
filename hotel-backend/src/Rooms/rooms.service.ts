import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly repository: Repository<RoomEntity>
  ) { }

  public async createRoom(data: RoomDto, files: Express.Multer.File[]): Promise<RoomEntity> {
    const imagePaths = files?.map(file => `/uploads/rooms/${file.filename}`) ?? [];

    const newRoom = this.repository.create({
      ...data,
      price: Number(data.price),
      capacity: Number(data.capacity),
      images: imagePaths,
    });

    return await this.repository.save(newRoom);
  }

  public async findALl(): Promise<RoomEntity[]> {
    return this.repository.find();
  }

  public async findAvailable(): Promise<RoomEntity[]> {
    return this.repository.find({
      where: { available: true }
    });
  }

  public async findById(id: number): Promise<RoomEntity> {
    const result = await this.repository.findOne({ where: { id } });
    if (!result) {
      throw new HttpException('Kjo dhomë nuk ekziston!', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  public async updateRoom(id: number, data: UpdateRoomDto, files?: Express.Multer.File[]): Promise<RoomEntity> {
    if (!data) {
      throw new HttpException('Request body mungon!', HttpStatus.BAD_REQUEST);
    }

    const imagePaths = files?.map(file => `/uploads/rooms/${file.filename}`);

    await this.repository.update(id, {
      ...(data.name && { name: data.name }),
      ...(data.description && { description: data.description }),
      ...(data.room_type && { room_type: data.room_type }),
      ...(data.price !== undefined && { price: Number(data.price) }),
      ...(data.capacity !== undefined && { capacity: Number(data.capacity) }),
      ...(data.available !== undefined && {
        available: data.available === true || (data.available as any) === 'true',
      }),
      ...(imagePaths?.length && { images: imagePaths }),
    });
    return this.findById(id);
  }

  public async deleteRoom(id: number) {
    await this.findById(id);
    return this.repository.delete(id);
  }
}