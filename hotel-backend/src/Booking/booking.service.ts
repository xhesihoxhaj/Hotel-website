import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from './entities/booking.entity';

import { RoomEntity } from 'src/Rooms/entities/room.entity';
import { BookingDto } from './DTO/booking.dto';
import { UserEntity } from 'src/Users/entities/user.entity';
import { BookingStatus } from './enums/booking-status.enum';
import { LessThan, MoreThan, Not, Repository } from 'typeorm';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(BookingEntity) private readonly bookingrepository: Repository<BookingEntity>,
        @InjectRepository(RoomEntity) private readonly roomrepository: Repository<RoomEntity>,
        @InjectRepository(UserEntity) private readonly userrepository: Repository<UserEntity>) { }

    public async create(data: BookingDto, user: UserEntity) {

        const room = await this.roomrepository.findOne({ where: { id: data.roomId } })
        if (!room) {
            throw new NotFoundException('The room does not exist!');
        }

        // const fullUser = await this.userrepository.findOne({ where: { id: user.id } });
        // if (!fullUser) {
        //     throw new NotFoundException('User not found!');
        
        // }
        const checkIn = new Date(data.checkIn); 
        const checkOut = new Date(data.checkOut);

        if (checkIn >= checkOut) {
            throw new BadRequestException('Check-in should be before check-out');
        }

        if (checkIn < new Date()) {
            throw new BadRequestException('Check-in should not be in the past!')
        }

        const findAvailable = await this.checkAvailability(data.roomId, checkIn, checkOut)
        if (!findAvailable) {
            throw new BadRequestException('The room is not available for these days');
        }

        const night = Math.ceil((checkOut.getTime() - checkIn.getTime()) / 86400000);
        const totalPrice = night * room.price;

        const booking = this.bookingrepository.create({
            user: { id: user.id },  // ← vetëm id, jo i gjithë payload
            room: { id: room.id },
            check_in: checkIn,
            check_out: checkOut,
            guestCount: data.guestsCount,
            notes: data.notes,
            total_price: totalPrice,
        });
        return this.bookingrepository.save(booking);

    }

    public async checkAvailability(roomId: number, checkIn: Date, checkOut: Date): Promise<boolean> {

        const conflict = await this.bookingrepository.findOne({
            where: {
                room: { id: roomId },
                status: Not(BookingStatus.CANCELLED),
                check_in: LessThan(checkOut),
                check_out: MoreThan(checkIn),
            },
            relations: ['room']
        });

        return !conflict;
    }

    public async getAll() {
        return this.bookingrepository.find({
            relations: ['room', 'user'],
            order: { created_at: 'DESC' }
        });
    }

    public async getById(id: number, user: UserEntity): Promise<BookingEntity> {
        const booking = await this.bookingrepository.findOne({
            where: {
                id: id,
                user: { id: user.id }
            },
        });
        if (!booking) {
            throw new NotFoundException('This reservation does not exist');
        }
        return booking;
    }

    public async getMyBooking(user: UserEntity): Promise<BookingEntity[]> {
        const booking = await this.bookingrepository.find({
            where: { user: { id: user.id } }
        });
        if (booking.length === 0) {
            throw new NotFoundException('You have no Booking reservation!');
        }
        return booking;
    }

    // public async cancel(id: number, user: UserEntity): Promise<BookingEntity> {
    //     const booking = await this.getById(id, user);

    //     if (booking.status === BookingStatus.CANCELLED) {
    //         throw new BadRequestException('This booking is already cancelled')

    //     }
    //     booking.status = BookingStatus.CANCELLED
    //     return this.bookingrepository.save(booking);
    // }

    // public async confirmed(id: number): Promise<BookingEntity> {
    //     const booking = await this.bookingrepository.findOne({ where: { id: id } });
    //     if (!booking) {
    //         throw new NotFoundException('This bookimg does not exist!');
    //     }

    //     if (booking.status !== BookingStatus.PENDING) {
    //         throw new BadRequestException('Only the pending reservation could be confirmed');

    //     }
    //     booking.status = BookingStatus.CONFIRMED
    //     return this.bookingrepository.save(booking);

    // }

    // public async completed(id: number): Promise<BookingEntity> {
    //     const booking = await this.bookingrepository.findOne({ where: { id: id } });
    //     if (!booking) {
    //         throw new NotFoundException('This booking does not exist');
    //     }
    //     if (booking.status !== BookingStatus.CONFIRMED) {
    //         throw new BadRequestException('Only confirmed bookings can be completed');
    //     }
    //     booking.status = BookingStatus.COMPLETED;
    //     return this.bookingrepository.save(booking);
    // }
    public async cancel(id: number, user: UserEntity): Promise<BookingEntity> {
        const booking = await this.getById(id, user);

        if (booking.status === BookingStatus.CANCELLED) {
            throw new BadRequestException('This booking is already cancelled');
        }

        await this.bookingrepository.update(id, { status: BookingStatus.CANCELLED });
        return { ...booking, status: BookingStatus.CANCELLED };
    }

    public async confirmed(id: number): Promise<BookingEntity> {
        const booking = await this.bookingrepository.findOne({ where: { id } });
        if (!booking) {
            throw new NotFoundException('This booking does not exist!');
        }
        if (booking.status !== BookingStatus.PENDING) {
            throw new BadRequestException('Only pending reservations can be confirmed');
        }

        await this.bookingrepository.update(id, { status: BookingStatus.CONFIRMED });
        return { ...booking, status: BookingStatus.CONFIRMED };
    }

    public async completed(id: number): Promise<BookingEntity> {
        const booking = await this.bookingrepository.findOne({ where: { id } });
        if (!booking) {
            throw new NotFoundException('This booking does not exist!');
        }
        if (booking.status !== BookingStatus.CONFIRMED) {
            throw new BadRequestException('Only confirmed bookings can be completed');
        }

        await this.bookingrepository.update(id, { status: BookingStatus.COMPLETED });
        return { ...booking, status: BookingStatus.COMPLETED };
    }
    }

