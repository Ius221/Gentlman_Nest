import { SigninUserDto } from './dtos/signin-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './../users/users.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from '../users/user.entity';

const myScrypt = promisify(scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async createNewUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.findByEmail(createUserDto.email);
    if (user) throw new BadRequestException('Email already exists');

    const salt = randomBytes(8).toString('hex');
    const generatedHash = (await myScrypt(
      createUserDto.password,
      salt,
      32,
    )) as Buffer;

    createUserDto.password = salt + '.' + generatedHash.toString('hex');

    return await this.usersService.createNewUser(createUserDto);
  }

  async signinUser(signinUserDto: SigninUserDto) {
    const user = await this.usersService.findByEmail(signinUserDto.email);
    if (!user) throw new UnauthorizedException('Invalid Credentials');

    const [salt, hashed] = user.password.split('.');
    const generatedHash = (await myScrypt(
      signinUserDto.password,
      salt,
      32,
    )) as Buffer;

    if (hashed !== generatedHash.toString('hex'))
      throw new UnauthorizedException('Invalid Credentials');

    return user;
    // return await this.usersService;
  }
}
