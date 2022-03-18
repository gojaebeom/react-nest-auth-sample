import { PickType } from '@nestjs/swagger';
import User from '../entities/user.entity';

export default class SignInRequest extends PickType(User, ['email', 'password']) {}
