import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';  // ← shto këtë
import { UsersModule } from './Users/users.module';
import { UserEntity } from './Users/entities/user.entity';
import { RoomsModule } from './Rooms/rooms.module';
import { RoomEntity } from './Rooms/entities/room.entity';
import { BookingEntity } from "./Booking/entities/booking.entity";
import { BookingModule } from './Booking/booking.module';
import { AuthModule } from './Auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // ←
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, 
      username: 'root',
      password: 'root',
      database: 'hotel',
      entities: [UserEntity, RoomEntity, BookingEntity],
      synchronize: true,
    }),
    UsersModule, RoomsModule, BookingModule, AuthModule,
  ]
})
export class AppModule { }