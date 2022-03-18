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
  signUp(@Body() body) {

    return this.userService.signUp(body);
  }
}
