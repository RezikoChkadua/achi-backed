import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class UserSeeder implements OnModuleInit {
  constructor(private readonly userService: UsersService) {}

  async onModuleInit() {
    if (process.env.NODE_ENV !== 'test') {
      console.log('iiiiinnn');
      const adminCount = await this.userService.count();
      if (adminCount === 0) {
        this.userService.create({
          email: 'admin@test.com',
          password: await this.userService.hashPassword('S7uP108i7Ch'),
          username: 'admin',
        });
      }
    }
  }
}
