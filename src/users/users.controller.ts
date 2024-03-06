import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInterceptor } from './interceptors/user.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UseInterceptors(ErrorInterceptor)
  create(@Body() createUserDto: CreateUserDto) {
    let response = this.usersService.create(createUserDto);
    return response;
  }

  @Get()
  @UseInterceptors(UserInterceptor)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseInterceptors(UserInterceptor)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Get('email/:email')
  @UseInterceptors(UserInterceptor)
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Patch(':id')
  @UseInterceptors(UserInterceptor)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseInterceptors(UserInterceptor)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
