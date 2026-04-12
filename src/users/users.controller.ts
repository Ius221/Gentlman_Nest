import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  public async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('email/:email')
  public async findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Patch('update/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  public async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Get('deleted')
  public async findDeletedUsers() {
    return this.usersService.findDeletedUsers();
  }

  @Patch(':id/restore')
  public async restoreUser(@Param('id') id: string) {
    return this.usersService.restoreUser(id);
  }
}
