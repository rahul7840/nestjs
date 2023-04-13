import { Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signup() {
    return {
      mes: 'helo ypou accesing object',
      mess: 'singup',
    };
  }
  signin() {
    return {
      mes: 'you accesing object',
      mess: 'singin',
    };
  }
}
