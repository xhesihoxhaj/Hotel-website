import { Module } from '@nestjs/common';
import { RoomEntity } from './entities/room.entity';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/Auth/auth.module'; // ← Shto

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomEntity]),
    AuthModule, 
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService]
})
export class RoomsModule { }