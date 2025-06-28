import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async followUser(currentUserId: string, targetUserId: string): Promise<string> {
  if (currentUserId === targetUserId) {
    return 'You cannot follow yourself';
  }

  const currentUser = await this.userModel.findById(currentUserId);
  const targetUser = await this.userModel.findById(targetUserId);

  if (!currentUser || !targetUser) {
    throw new NotFoundException('User not found');
  }

  if (!currentUser.following.includes(targetUserId)) {
    currentUser.following.push(targetUserId);
    await currentUser.save();
  }

  if (!targetUser.followers.includes(currentUserId)) {
    targetUser.followers.push(currentUserId);
    await targetUser.save();
  }

  return 'Followed successfully';
}


  async unfollowUser(currentUserId: string, targetUserId: string): Promise<string> {
  const currentUser = await this.userModel.findById(currentUserId);
  const targetUser = await this.userModel.findById(targetUserId);

  if (!currentUser || !targetUser) {
    throw new NotFoundException('User not found');
  }

  currentUser.following = currentUser.following.filter(id => id !== targetUserId);
  await currentUser.save();

  targetUser.followers = targetUser.followers.filter(id => id !== currentUserId);
  await targetUser.save();

  return 'Unfollowed successfully';
}


  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().select('username email followers following');
  }
}
