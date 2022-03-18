import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import User from './entities/user.entity';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  getCurrentUser() {
    return 'get my profile data';
  }

  async signUp(body: any) {
    console.debug(body);
    const findUser = await this.userRepository.findOne({
      where: { email: body.email },
    });
    console.debug(findUser);
    if (findUser) {
      throw new ConflictException('이미 존재하는 이메일 입니다. 😩');
    }
  }
}
