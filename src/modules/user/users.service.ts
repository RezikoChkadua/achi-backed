import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../models/user.entity';
import { CreateUserDto } from '../auth/createUser.dto';
import { LoginUserDto } from './loginUser.dto';
import { UserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  public async getOne(options?: object): Promise<UserDto> {
    return await this.repo.findOne(options);
  }
  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.repo.findOne({ where: { username } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await comparePasswords(password, user.password);
    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
  async findByPayload({ username }: any): Promise<UserDto> {
    return await this.getOne({
      where: { username },
    });
  }

  public async create(dto: CreateUserDto): Promise<CreateUserDto> {
    let data = CreateUserDto.toEntity(dto);
    return await this.repo.save(data).then(e => CreateUserDto.fromEntity(e));
  }

  async hashPassword(password: string): Promise<string> {
    const SALT_DEPTH = 10;
    const salt = await bcrypt.genSalt(SALT_DEPTH);
    return await bcrypt.hash(password, salt);
  }

  async count() {
    return await this.repo.count();
  }
}

async function comparePasswords(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
