import { Body, Controller, Get, Post } from '@nestjs/common';
import UserService from './user.service';

@Controller('users')
export default class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/me')
  getCurrentUser() {
    return this.userService.getCurrentUser();
  }

  @Post()
  async signUp(@Body() body) {

    return await this.userService.signUp(body);
  }
}
