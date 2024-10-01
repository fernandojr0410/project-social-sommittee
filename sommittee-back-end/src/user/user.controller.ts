import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() request) {
    const userEmail = request.user.email;
    const user = await this.userService.findProfile(userEmail);
    await this.userService.updateLastAction(user.id, 'findAll');
    const dataUsers = await this.userService.findAll();
    return { userEmail, dataUsers };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const dataUser = await this.userService.findOne(id);
    await this.userService.updateLastAction(dataUser.id, 'findOne');
    return dataUser;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const dataUser = await this.userService.remove(id);
    await this.userService.updateLastAction(dataUser.id, 'remove');
    return dataUser;
  }
}
