import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CONSTANTS } from 'src/constants';

@Injectable()
export class UserService {
  public users: User[] = [
    {
      username: 'user1',
      password: 'user1',
      email: 'user1@gmail.com',
      age: 22,
      role: CONSTANTS.ROLE.ANDROID_DEVLOPER,
    },
    {
      username: 'user2',
      password: 'user2',
      email: 'user2@gmail.com',
      age: 33,
      role: CONSTANTS.ROLE.ANDROID_DEVLOPER,
    },
    {
      username: 'user3',
      password: 'user3',
      email: 'user3@gmail.com',
      age: 32,
      role: CONSTANTS.ROLE.ANDROID_DEVLOPER,
    },
    {
      username: 'user4',
      password: 'user4',
      email: 'user4@gmail.com',
      age: 52,
      role: CONSTANTS.ROLE.WEB_DEVLOPER,
    },
    {
      username: 'user5',
      password: 'user5',
      email: 'user5@gmail.com',
      age: 41,
      role: CONSTANTS.ROLE.ANDROID_DEVLOPER,
    },
  ];

  getUSerByUserName(username: string): User {
    return this.users.find((user) => user.username === username);
  }
}
