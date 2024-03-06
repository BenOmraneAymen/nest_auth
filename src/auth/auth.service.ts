import { HttpException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(data: AuthDto) {
    const user: User = await this.usersRepository.findOne({
      where: { email: data.email },
    });
    if (!user) {
      return 'User not found';
    }
    let valid = await bcrypt.compare(data.password, user.password);
    if (!valid) {
      return 'Invalid password';
    }
    let token = this.jwtService.sign({ id: user.id });
    let refresh = this.jwtService.sign({ id: user.id }, { expiresIn: '7d' });
    return { AccessToken: token, refreshToken: refresh };
  }

  async verify(req: Request) {
    const token = req.headers['authorization'];
    if (!token) {
      throw new HttpException('Token not found', 404);
    }
    try {
      const user = this.jwtService.verify(
        token,
        this.configService.get('JWT_SECRET'),
      );
      return user;
    } catch (e) {
      throw new HttpException('Invalid token', 404);
    }
  }
}
