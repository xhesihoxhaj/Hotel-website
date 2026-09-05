import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { UserEntity } from "../../Users/entities/user.entity";
import { RoomEntity } from "../../Rooms/entities/room.entity";
import { BookingStatus } from '../enums/booking-status.enum';

@Entity('bookings')
export class BookingEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    check_in: Date;

    @Column()
    check_out: Date;

    @CreateDateColumn()
    created_at: Date;

    @Column({
        type: 'enum',
        enum: BookingStatus,
        default: BookingStatus.PENDING,
    })
    status: BookingStatus;

    @Column()
    total_price: number;

    @Column()
    guestCount: number;

    @Column({ nullable: true })
    notes: string;

  
    @ManyToOne(() => UserEntity, (user) => user.bookings)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => RoomEntity, (room) => room.bookings)
    @JoinColumn({ name: 'room_id' })
    room: RoomEntity;

   

}
