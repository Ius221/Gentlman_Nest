import { Expose } from 'class-transformer';
import { Role } from '../user.entity';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  dateOfBirth: string;

  @Expose()
  url: string;

  @Expose()
  role: Role;
}
