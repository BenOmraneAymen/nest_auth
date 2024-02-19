
import { IsAlphanumeric, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, Not } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  @IsNotEmpty()
  username:string;

  @Column({unique: true})
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(8)
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
