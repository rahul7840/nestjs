import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { RoleGuard } from './user/role.guard';
import { CONSTANTS } from './constants';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  // 1-Issue  id card jwt tocken
  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req): string {
    //authentication is done here

    //here we pass the (req.user) user data in to token
    return this.authService.genrateToken(req.user);
    // return req.user;
    // return 'you are loggedin...'
  }

  @Get('aadevloper')
  @UseGuards(AuthGuard('jwt'), new RoleGuard(CONSTANTS.ROLE.ANDROID_DEVLOPER))
  A_devloper(@Request() req): string {
    return (
      'this is private data for <<android>> <<devloper>>' +
      JSON.stringify(req.user)
    );
  }
  @Get('wwdevloper')
  @UseGuards(AuthGuard('jwt'), new RoleGuard(CONSTANTS.ROLE.WEB_DEVLOPER))
  W_devloper(@Request() req): string {
    return (
      'this is private data for <WEB> <devloper>' + JSON.stringify(req.user)
    );
  }
}
