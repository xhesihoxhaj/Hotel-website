import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateRoomDto {

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    room_type?: string;

    @IsOptional()
    price?: number;

    @IsBoolean()
    @IsOptional()
    available?: boolean;

    @IsOptional()
    capacity?: number;
}
