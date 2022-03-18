import { OmitType } from '@nestjs/swagger';
import User from '../entities/user.entity';

export default class MyProfileResponse extends OmitType(User, ['password']) {
  constructor(user: User) {
    super();
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.nickname = user.nickname;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
