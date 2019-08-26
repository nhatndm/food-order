import { Post, Controller, UseGuards, Body } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { FilterUserDto } from './dto/user-filter-dto';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@ApiUseTags('Users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/all')
  async findAllUser(
    @Body() filterUserDto: FilterUserDto,
  ): Promise<UserEntity[]> {
    return await this.userService.findUsers(filterUserDto);
  }
}
