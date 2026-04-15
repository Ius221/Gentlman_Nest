import { CreateUserDto } from './../auth/dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, IsNull } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createNewUser(createUserDto: CreateUserDto) {
    const createdUser = this.usersRepository.create(createUserDto);

    return await this.usersRepository.save(createdUser);
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
