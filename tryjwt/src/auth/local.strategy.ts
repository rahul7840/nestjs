import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userservice: UserService) {
    super();
  }

  //ye vo username and pass he jo login karte time diyajatahe
  validate(usernane: string, password: string): User {
    const user: User = this.userservice.getUSerByUserName(usernane);
    if (user === undefined) throw new UnauthorizedException();
    if (user != undefined && user.password == password) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
