import { Controller, Param, Post, UseGuards, Request, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
@Post('follow/:id')
async follow(@Request() req, @Param('id') id: string) {
  const currentUserId = req.user.userId;
  const cleanId = id.trim(); // 🔥 this removes `\n` or spaces
  const result = await this.usersService.followUser(currentUserId, cleanId);
  return { message: result };
}

  @UseGuards(JwtAuthGuard)
@Post('unfollow/:id')
async unfollow(@Request() req, @Param('id') id: string) {
  const currentUserId = req.user.userId;
  const cleanId = id.trim(); // 🔥 same here
  const result = await this.usersService.unfollowUser(currentUserId, cleanId);
  return { message: result };
}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
