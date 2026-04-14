import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signupNewUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createNewUser(createUserDto);
  }
}
