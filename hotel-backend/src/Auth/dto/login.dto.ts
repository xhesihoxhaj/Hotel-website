import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';



export class LoginDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
