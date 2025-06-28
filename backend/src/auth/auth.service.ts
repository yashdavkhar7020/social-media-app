import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../users/user.schema';
import { SignupDto, LoginDto } from './auth.dto';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {}

  async signup(signupDto: SignupDto): Promise<any> {
    const { username, email, password } = signupDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    return { message: 'Signup successful' };
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { sub: user._id };
    const accessToken = jwt.sign(
  payload,
  this.configService.get('JWT_SECRET') || 'defaultsecret',
  {
    expiresIn: this.configService.get('JWT_EXPIRES_IN') || '1d',
  }
);


    return {
      message: 'Login successful',
      accessToken,
    };
  }
}
