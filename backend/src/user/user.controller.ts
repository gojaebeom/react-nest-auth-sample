import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtValidationGuard } from 'src/common/guards/jwt.guard';
import { JwtRequest } from 'src/common/interfaces/request';
import SignInRequest from './dto/signin.request';
import SignUpRequest from './dto/signup.request';
import UserService from './user.service';

@Controller('users')
export default class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/me')
  @UseGuards(JwtValidationGuard)
  getCurrentUser(@Req() req: JwtRequest) {
    const uid = req.uid;
    return this.userService.getCurrentUser(uid);
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
