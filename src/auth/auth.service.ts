import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/create-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

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

      const payload = { username: user.email, sub: user.id };
      const token = this.jwtService.sign(payload);

      return {
        token,
        user,
      };
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

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.prismaService.user.findUnique({
      where: { username: payload.username },
    });
  }
}
