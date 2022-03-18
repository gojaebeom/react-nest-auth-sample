import {
  Controller,
  ForbiddenException,
  Get,
  GoneException,
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  globalFilterTest(): string {
    // throw new HttpException('커스텀 에러입니다. 내가 적는 에러코드', 403);
    // throw new UnauthorizedException('인증 관련 에러 401 입니다.');
    // throw new NotFoundException('Not Found 404 에러입니다.');
    throw new ForbiddenException('403 인증 관련 에러입니다.');
  }
}
