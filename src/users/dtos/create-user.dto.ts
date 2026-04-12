import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { Role } from '../user.entity';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @MaxLength(20)
  firstName: string;

  @IsString()
  @MaxLength(20)
  lastName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsStrongPassword(
    {
      minLength: 6,
      minSymbols: 0,
    },
    { message: 'Password must contain 1 number, 1 small-case, 1 capital-case' },
  )
  password: string;

  @IsDateString()
  dateOfBirth: string;

  @IsUrl()
  url: string;

  @IsEnum(Role)
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  @IsOptional()
  role: Role;
}
