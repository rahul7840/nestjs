import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signupDto: SignUpDto): Promise<{ token: String }> {
    return await this.authService.signUp(signupDto);
  }
  @Get('login')
  async logIn(@Body() loginDto: LogInDto) {
    return await this.authService.logIn(loginDto);
  }
}
