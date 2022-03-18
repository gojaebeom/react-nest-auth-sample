import { Injectable } from '@nestjs/common';

@Injectable()
export default class UserService {
  getCurrentUser() {
    return 'get my profile data';
  }
}
