import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
  @UseGuards(AdminGuard)
  public async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Get('deleted')
  @UseGuards(AdminGuard)
  public async findDeletedUsers() {
    return this.usersService.findDeletedUsers();
  }

  @Patch(':id/restore')
  @UseGuards(AdminGuard)
  public async restoreUser(@Param('id') id: string) {
    return this.usersService.restoreUser(id);
  }
}
