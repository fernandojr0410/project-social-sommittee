import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { QueryUserDto } from './dto/query-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  // @UseGuards(AuthGuard)
  // @Get()
  // async findAll(@Req() request) {
  //   const userEmail = request.user.email;
  //   const user = await this.userService.findProfile(userEmail);
  //   await this.userService.updateLastAction(user.id, 'findAll');
  //   const dataUsers = await this.userService.findAll();
  //   return { userEmail, dataUsers };
  // }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() query: QueryUserDto) {
    return await this.userService.findAll(query);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    const dataUser = await this.userService.findById(id);
    await this.userService.updateLastAction(dataUser.id, 'findOne');
    return dataUser;
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
