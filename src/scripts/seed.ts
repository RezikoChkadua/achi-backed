// scripts/seed.ts
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '../config/config.service';
import { User } from '../models/user.entity';
import { AuthService } from '../modules/auth/auth.service';
import { CreateUserDto } from '../modules/auth/createUser.dto';
import { UsersService } from '../modules/user/users.service';

async function run() {
  const seedUser: CreateUserDto = {
    username: 'admin',
    password: 'S7uP108i7Ch',
    email: 'admin@gmail.com',
  };

  const seedId = Date.now()
    .toString()
    .split('')
    .reverse()
    .reduce((s, it, x) => (x > 3 ? s : (s += it)), '');

  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true,
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const userService = new UsersService(connection.getRepository(User));
  const jwtService = new JwtService({});
  const authService = new AuthService(userService, jwtService);

  await authService.register(seedUser);

  console.log('user seeded');
}

run()
  .then(_ => console.log('...wait for script to exit'))
  .catch(error => console.error('seed error', error));
