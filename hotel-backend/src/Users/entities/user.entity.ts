import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RoomEntity } from "../../Rooms/entities/room.entity";
import { BookingEntity } from "../../Booking/entities/booking.entity";

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: 'customer' })
    role: string

    @OneToMany(() => RoomEntity, (room) => room.user)
    rooms: RoomEntity[];

    @OneToMany(() => BookingEntity, (booking) => booking.user)
    bookings: BookingEntity[];

}
