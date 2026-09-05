import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { UserEntity } from "../../Users/entities/user.entity";
import { BookingEntity } from "../../Booking/entities/booking.entity";

@Entity('rooms')
export class RoomEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column("simple-array")  
    images: string[]; 
    
    @Column()
    price: number;

    @Column({ type: 'boolean', default: false })
    available: boolean;

    @Column()
    capacity: number;

    @Column()
    room_type: string;

   
    @ManyToOne(() => UserEntity, (user) => user.rooms)
    @JoinColumn({name:'user_id'})
    user: UserEntity;

    @OneToMany(() => BookingEntity, (booking) => booking.room)
    bookings: BookingEntity[];

}
