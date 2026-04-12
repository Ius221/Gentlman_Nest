import { Body, Controller, Post, Session } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupUserDto } from './dtos/signup-user.dto';
import { SigninUserDto } from './dtos/signin-user.dto';

export interface UserSession {
  userId?: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  public async createUser(@Body() signupUserDto: SignupUserDto) {
    return await this.usersService.signupUser(signupUserDto);
  }

  @Post('signin')
  public async signinUser(
    @Body() signinUserDto: SigninUserDto,
    @Session() session: UserSession,
  ) {
    const user = await this.usersService.signinUser(signinUserDto);
    session.userId = user.id;
    return user;
  }
}
