import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserDto {

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    @MinLength(6)
    password!: string;
    
}
