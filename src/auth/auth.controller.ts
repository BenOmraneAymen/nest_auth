import { Body, Controller, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { UserInterceptor } from 'src/users/interceptors/user.interceptor';
import { authentificationGuard } from './guards/auth.gard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() data : AuthDto) {
    return this.authService.login(data);
  }


  @Post("/verify")
  @UseGuards(authentificationGuard)
  verify(@Request() data : Request){
    return this.authService.verify(data)
  }
}
