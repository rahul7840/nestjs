import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { promises } from 'dns';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;
    const heshPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: heshPassword,
    });
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
  async logIn(logInDto: LogInDto) {
    const { email, password } = logInDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      return { message: 'User not found Please! SignUp' };
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return { message: 'OOPS! Wrong Password' };
    }
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
}
