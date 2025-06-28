import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './post.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/user.schema';


@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createPost(userId: string, title: string, description: string): Promise<Post> {
    return this.postModel.create({ userId, title, description });
  }

  async getTimeline(userId: string): Promise<Post[]> {
    const user = await this.userModel.findById(userId).lean();

    if (!user) return [];

    const followingIds = user.following;

    return this.postModel
      .find({ userId: { $in: followingIds } })
      .sort({ createdAt: -1 });
  }
  async getMyPosts(userId: string): Promise<Post[]> {
  return this.postModel.find({ userId }).sort({ createdAt: -1 });
}

}
