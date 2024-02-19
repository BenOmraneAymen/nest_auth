import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsAlphanumeric, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    @IsAlphanumeric()
    @MinLength(8)
    password: string;
}

