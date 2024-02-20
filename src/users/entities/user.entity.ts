import { Exclude } from 'class-transformer';
import {
  IsAlphanumeric,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, Not } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  username: string;

  @Column({ unique: true })
  @IsString()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @MinLength(8)
  @MaxLength(20)
  @Exclude()
  password: string;

  @Column({ default: true })
  @IsBoolean()
  isActive: boolean;
}
