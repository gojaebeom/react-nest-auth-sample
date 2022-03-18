import { Body, Controller, Get, Post } from '@nestjs/common';
import SignUpRequest from './dto/signup.request';
import UserService from './user.service';

@Controller('users')
export default class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/me')
  getCurrentUser() {
    return this.userService.getCurrentUser();
  }

  @Post()
  async signUp(@Body() body: SignUpRequest) {
    return await this.userService.signUp(body);
  }
}
