import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, BadRequestException, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { RoomEntity } from './entities/room.entity';
import { ImageNameHelper } from '../helpers/ImageNameHelper'
import { AuthGuard } from 'src/Auth/auth.guards';
import { RolesGuard } from 'src/Auth/roles.guard';
import { Roles } from 'src/Auth/roles.decorator';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post('create')
  @UseInterceptors(FilesInterceptor('images', 4, {
    storage: diskStorage({
      destination: './uploads/rooms',
      filename: (req, file: Express.Multer.File, cb) => {
        const imageName = new ImageNameHelper(file.originalname).getImageName();
        cb(null, imageName);
      }
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
        return cb(new BadRequestException('Vetëm foto lejohen!'), false);
      }
      cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 }
  }))
  public async create(
    @Body() data: RoomDto,
    @UploadedFiles() files: Express.Multer.File[]
  ): Promise<RoomEntity> {
    return await this.roomsService.createRoom(data, files);
  }



  @Get('all')
  public async findAllRooms(): Promise<RoomEntity[]> {
    return this.roomsService.findALl();
  }


  @Get('available')
  public async availableRoom(): Promise<RoomEntity[]> {
    return this.roomsService.findAvailable();
  }

  @Get(':id')
  public async findRoomById(@Param('id') id: number): Promise<RoomEntity> {
    return this.roomsService.findById(id);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  public async updateRoom(
    @Param('id') id: number,
    @Body() data: UpdateRoomDto
  ): Promise<RoomEntity> {
    return await this.roomsService.updateRoom(id, data);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  public async deleteRoom(@Param('id') id: number) {
    return await this.roomsService.deleteRoom(id);
  }
}
