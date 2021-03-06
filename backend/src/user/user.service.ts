import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import Payload from 'src/common/interfaces/payload';
import { Repository } from 'typeorm';
import MyProfileResponse from './dto/myprofile.response';
import signinRequest from './dto/signin.request';
import SignUpRequest from './dto/signup.request';
import User from './entities/user.entity';
import * as jwt from 'jsonwebtoken';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getCurrentUser(uid: number) {
    const user: User = await this.userRepository.findOne({
      where: { id: uid },
    });
    if (!user)
      throw new NotFoundException(
        '로그인 한 유저의 데이터가 보이지 않아요. 어찌된 일이죠..? 😨',
      );

    return new MyProfileResponse(user);
  }

  async signUp(body: SignUpRequest) {
    const findUser = await this.userRepository.findOne({
      where: { email: body.email },
    });
    console.debug(findUser);
    if (findUser)
      throw new ConflictException('이미 존재하는 이메일 입니다. 😩');

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(body.password, saltRounds);

    const user = new User();
    user.email = body.email;
    user.name = body.name;
    user.password = hashPassword;

    return this.userRepository.save(user);
  }

  getTokens(uid: number) {
    const actExp = Math.floor(Date.now() / 1000) + 30;
    const rftExp = Math.floor(Date.now() / 1000) + 60 * 5;

    const actPayload: Payload = {
      uid: uid,
      exp: actExp,
      sub: 'act',
    };
    const rftPayload: Payload = {
      uid: uid,
      exp: rftExp,
      sub: 'rft',
    };
    const act = jwt.sign(actPayload, process.env.JWT_SECRET);
    const rft = jwt.sign(rftPayload, process.env.JWT_SECRET);
    return { act, actExp, rft };
  }

  async signIn(body: signinRequest) {
    const user: User = await this.userRepository.findOne({
      where: { email: body.email },
    });
    const message: string = '이메일 또는 비밀번호가 일치하지 않아요. 🤪';
    if (!user) throw new UnauthorizedException(message);

    const isMatchedPassword: boolean = await bcrypt.compare(
      body.password,
      user.password,
    );
    if (!isMatchedPassword) throw new UnauthorizedException(message);
    const uid = user.id;
    return this.getTokens(uid);
  }

  async deleteUser(uid: number) {
    return await this.userRepository.delete(uid);
  }
}
