import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDto } from './DTO/booking.dto';
import { AuthGuard } from '../Auth/auth.guards';
import { RolesGuard } from 'src/Auth/roles.guard';
import { Roles } from 'src/Auth/roles.decorator';

@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    @Post()
    create(@Body() dto: BookingDto, @Request() req) {
        const user = req.user ?? { id: 1 };
        return this.bookingService.create(dto, user);
    }

    @Get()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin')
    getAll() {
        return this.bookingService.getAll();
    }

    // @UseGuards(AuthGuard)
    // @Get('my')
    getMyBookings(@Request() req) {
        return this.bookingService.getMyBooking(req.user);
    }

    @UseGuards(AuthGuard)
    @Patch(':id/cancel')
    cancel(@Param('id') id: number, @Request() req) {
        return this.bookingService.cancel(id, req.user);
    }

    @Patch(':id/confirm')
    @UseGuards(RolesGuard)
    @Roles('admin')
    confirm(@Param('id') id: number) {
        return this.bookingService.confirmed(id);
    }

    @Patch(':id/complete')
    @UseGuards(RolesGuard)
    @Roles('admin')
    complete(@Param('id') id: number) {
        return this.bookingService.completed(id);
    }

    // @UseGuards(AuthGuard)
    // @Get(':id')
    getById(@Param('id') id: number, @Request() req) {
        return this.bookingService.getById(id, req.user);
    }
}