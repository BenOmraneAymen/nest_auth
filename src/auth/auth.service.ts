import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async login(data: AuthDto) {
    const user: User = await this.usersRepository.findOne({
      where: { email: data.email },
    });
    if (!user) {
      return 'User not found';
    }
    if (!bcrypt.compare(data.password, user.password)) {
      return 'Invalid password';
    }
    return { id: user.id };
  }
  
}
