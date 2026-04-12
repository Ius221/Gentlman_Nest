import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, IsNull } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
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

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.findByEmail(createUserDto.email);
    if (user) throw new BadRequestException('Email already exists');

    const createdUser = this.usersRepository.create(createUserDto);
    const salt = randomBytes(8).toString('hex');
    const hash = (await myScrypt(createUserDto.password, salt, 32)) as Buffer;

    createdUser.password = salt + '.' + hash.toString('hex');

    return await this.usersRepository.save(createdUser);
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
