import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { BookingEntity } from './entities/booking.entity';
import { UserEntity } from 'src/Users/entities/user.entity';
import { RoomEntity } from 'src/Rooms/entities/room.entity';
import { AuthModule } from 'src/Auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingEntity, UserEntity, RoomEntity]),
    AuthModule,  // ← veçmas!
  ],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService]
})
export class BookingModule { }