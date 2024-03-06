import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt'


@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService,private readonly userService: UsersService) {}

    async forgotPassword(email:string) {
        let user:User = await this.userService.findByEmail(email);
        console.log(user)
        let password = Math.random().toString(36).slice(-8);
        user.password = await bcrypt.hash(password,10);
        this.userService.update(user.id,user);
        return this.mailerService.sendMail({
          to: email,
          subject: 'Forgot Password',
          text: 'welcome',
          html: `<b>Your new password is: ${password}</b>`,
    });
  }
}
