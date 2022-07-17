import { Injectable } from '@nestjs/common';
import { User } from './../user/user.entity';

@Injectable()
export class AuthService {

  async signUp(user: User) {
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    // create user in db
    // ...
    // send confirmation mail
  }
}