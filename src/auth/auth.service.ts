import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/create-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: signInDto.email,
        },
      });
      if (!user) {
        return 'User not found';
      }

      const isPasswordValid = await bcrypt.compare(
        signInDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        return 'Wrong password';
      }

      return user;
    } catch (error) {
      return error;
    }
  }

  async requestEmail(email: string): Promise<User> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: email,
        },
      });
      if (user) {
        return user;
      } else {
        return user;
      }
    } catch (error) {
      return error;
    }
  }
}
