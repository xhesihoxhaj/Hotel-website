// dto/create-booking.dto.ts
import {
    IsDateString, IsInt, IsOptional,
    IsString, Min,
} from 'class-validator';

export class BookingDto {
    @IsInt()
    roomId: number;

    @IsDateString()
    checkIn: string;

    @IsDateString()
    checkOut: string;

    @IsInt()
    @Min(1)
    guestsCount: number;

    @IsOptional()
    @IsString()
    notes?: string;
}
