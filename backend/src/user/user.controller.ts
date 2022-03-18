import { Body, Controller, Get, Post } from '@nestjs/common';
import SignInRequest from './dto/signin.request';
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

  @Post('/login')
  async signIn(@Body() body: SignInRequest) {
    return await this.userService.signIn(body);
  }
}
