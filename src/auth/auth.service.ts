import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async createNewUser(createUserDto: CreateUserDto) {
    return await this.usersService.createNewUser(createUserDto);
  }
}
