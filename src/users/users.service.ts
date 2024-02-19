import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }
  create(data: CreateUserDto) {

    try {
      const user = this.usersRepository.create(data);
      return this.usersRepository.save(user);
    } catch (e) {
      console.log(e);
    }
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
      return this.usersRepository.findOne({where:{id}});
    } catch (e) {
      console.log(e);
    }
  }

  update(id: number, data: UpdateUserDto) {

    try {
      return this.usersRepository.update({id}, data);
    } catch (e) {
      console.log(e);
    }
  }

  remove(id: number) {

    try {
      return this.usersRepository.delete({id});
    } catch (e) {
      console.log(e);
    }
  }
}
