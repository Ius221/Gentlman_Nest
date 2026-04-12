import { IsEmail, IsStrongPassword } from 'class-validator';

export class SigninUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword(
    {
      minLength: 6,
      minSymbols: 0,
    },
    { message: 'Password must contain 1 number, 1 small-case, 1 capital-case' },
  )
  password: string;
}
