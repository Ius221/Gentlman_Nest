import { SigninUserDto } from './dtos/signin-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, IsNull } from 'typeorm';
import { User } from './user.entity';
import { SignupUserDto } from './dtos/signup-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const myScrypt = promisify(scrypt);

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signupUser(signupUserDto: SignupUserDto) {
    const user = await this.findByEmail(signupUserDto.email);
    if (user) throw new BadRequestException('Email already exists');

    const createdUser = this.usersRepository.create(signupUserDto);
    const salt = randomBytes(8).toString('hex');
    const hash = (await myScrypt(signupUserDto.password, salt, 32)) as Buffer;

    createdUser.password = salt + '.' + hash.toString('hex');

    return await this.usersRepository.save(createdUser);
  }

  async signinUser(signinUserDto: SigninUserDto) {
    const fetchedUser = await this.findByEmail(signinUserDto.email);

    if (!fetchedUser?.password) {
      throw new BadRequestException('Invalid credentials');
    }

    const [salt, storedPassword] = fetchedUser.password.split('.');

    const hashedPassword = (await myScrypt(
      signinUserDto.password,
      salt,
      32,
    )) as Buffer;

    if (storedPassword !== hashedPassword.toString('hex'))
      throw new BadRequestException('Invalid credentials');

    return fetchedUser;
  }

  async findById(id: string) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    return await this.usersRepository.findOne({ where: { id } });
  }

  async deleteUser(id: string) {
    return await this.usersRepository.softDelete(id);
  }

  async findDeletedUsers() {
    return await this.usersRepository.find({
      withDeleted: true,
      where: { deleteAt: Not(IsNull()) },
    });
  }

  async restoreUser(id: string) {
    return await this.usersRepository.restore(id);
  }
}
