import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, Length, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    // @IsString()
    // @IsNotEmpty()
    // username: string;
    // @IsEmail()
    // email: string;
    // @IsString()
    // @MinLength(8)
    // @IsNotEmpty()
    // @MinLength(8, { message: 'Password must be at least 8 characters long' })
    // @MaxLength(20, { message: 'Password must be at most 20 characters long' })
    // @IsAlphanumeric()  
    // password: string;
    // isActive: boolean;
    // isSuspended:boolean;

    firstName: string;
    lastName: string;
    isActive: boolean;
}
