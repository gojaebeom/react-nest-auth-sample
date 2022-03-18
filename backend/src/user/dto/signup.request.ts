import { PickType } from '@nestjs/swagger';
import User from '../entities/user.entity';

export default class SignUpRequest extends PickType(User, [
  'email',
  'password',
  'name',
]) {}
