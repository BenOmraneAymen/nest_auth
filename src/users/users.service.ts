import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }
  async create(data: CreateUserDto) {
    const userExists = await this.usersRepository.findOne({ where: { username: data.username } });
    if (userExists) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    data.password = await bcrypt.hash(data.password, 10);
    const user =this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }

  findAll() {
    try {
      return this.usersRepository.find();
    } catch (e) {
      console.log(e);
    }
  }

  findOne(id: number) {
    try {
      return this.usersRepository.findOne({ where: { id } });
    } catch (e) {
      console.log(e);
    }
  }

  findByEmail(email: string) {
    try {
      return this.usersRepository.findOne({ where: { email } });
    } catch (e) {
      console.log(e);
    }
  }

  update(id: number, data: UpdateUserDto) {
    try {
      this.usersRepository.update({ id }, data);
      return this.usersRepository.findOne({ where: { id } });
    } catch (e) {
      console.log(e);
    }
  }

  remove(id: number) {
    try {
      return this.usersRepository.delete({ id });
    } catch (e) {
      console.log(e);
    }
  }
}
