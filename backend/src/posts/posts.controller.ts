import { Controller, Get, Post as HttpPost, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @HttpPost()
  async createPost(@Request() req, @Body() body: { title: string; description: string }) {
    const userId = req.user.userId;
    const { title, description } = body;

    const post = await this.postsService.createPost(userId, title, description);
    return {
      message: 'Post created successfully',
      post,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('timeline')
  async getTimeline(@Request() req) {
    const userId = req.user.userId;
    const posts = await this.postsService.getTimeline(userId);
    return {
      message: 'Timeline fetched successfully',
      posts,
    };
  }
  @UseGuards(JwtAuthGuard)
@Get('mine')
async getMyPosts(@Request() req) {
  const userId = req.user.userId;
  const posts = await this.postsService.getMyPosts(userId);
  return {
    message: 'My posts fetched successfully',
    posts,
  };
}

}
