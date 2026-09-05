import { IsString, IsNotEmpty, IsOptional, IsEmail } from "class-validator";

export class RegisterDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    role?: string; // ← Shto këtë, optional sepse default është 'customer'
}