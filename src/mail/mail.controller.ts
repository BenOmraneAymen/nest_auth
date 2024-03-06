import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  forgotPassword(@Body() data: { email: string }) {
    {
      this.mailService.forgotPassword(data.email);
    }
  }
}
