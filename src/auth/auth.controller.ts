import { UserDto } from './../users/dtos/user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { SigninUserDto } from './dtos/signin-user.dto';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  createNewUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createNewUser(createUserDto);
  }

  @Post('signin')
  signinUser(@Body() signinUserDto: SigninUserDto) {
    return this.authService.signinUser(signinUserDto);
  }
}
