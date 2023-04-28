import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // getHello() {
  //   return 'Hello rahul!';
  // }

  async getDogs() {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: 'Luna',
            breed: 'Caucasian Shepherd',
          },
          {
            id: 2,
            name: 'Ralph',
            breed: 'Husky',
          },
          {
            id: 3,
            name: 'tiger',
            breed: 'Indian',
          },
          {
            id: 4,
            name: 'tomy',
            breed: 'Indian',
          },
        ]);
      });
    });
  }

  // async getHorse() {
  //   return new Promise((resolve, _) => {
  //     setTimeout(() => {
  //       resolve([
  //         {
  //           id: 1,
  //           name: 'Horse-1',
  //           breed: 'american',
  //         },
  //         {
  //           id: 2,
  //           name: 'Horse-2',
  //           breed: 'russian',
  //         },
  //         {
  //           id: 3,
  //           name: 'Horse-3',
  //           breed: 'Indian',
  //         },
  //         {
  //           id: 4,
  //           name: 'Horse-4',
  //           breed: 'nepali',
  //         },
  //         {
  //           id: 4,
  //           name: 'Horse-5',
  //           breed: 'bali',
  //         },
  //         {
  //           id: 4,
  //           name: 'Horse-6',
  //           breed: 'thailand',
  //         },
  //       ]);
  //     });
  //   });
  // }
  async getSite() {
    // fetch data from remote server
    const data = await fetch('https://www.youtube.com/');
    return data;
  }
}
