import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtservice: JwtService) {}

  //id-card(Token)
  //here in payload contain what you want to store in thi stoken

  genrateToken(payload: User) {
    return this.jwtservice.sign(payload);
  }

  //now here the token genrate and call whaere you want
}
