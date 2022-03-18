import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import MyProfileResponse from './dto/myprofile.response';
import SignUpRequest from './dto/signup.request';
import User from './entities/user.entity';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getCurrentUser() {
    const user: User = await this.userRepository.findOne({ where: { id: 2 } });
    if (!user) {
      throw new NotFoundException(
        '로그인 한 유저의 데이터가 보이지 않아요. 어찌된 일이죠..? 😨',
      );
    }

    return new MyProfileResponse(user);
  }

  async signUp(body: SignUpRequest) {
    const findUser = await this.userRepository.findOne({
      where: { email: body.email },
    });
    console.debug(findUser);
    if (findUser) {
      throw new ConflictException('이미 존재하는 이메일 입니다. 😩');
    }
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(body.password, saltRounds);

    const user = new User();
    user.email = body.email;
    user.name = body.name;
    user.password = hashPassword;

    return this.userRepository.save(user);
  }
}
