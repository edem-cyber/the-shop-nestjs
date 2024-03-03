import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/create-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

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
        // return http exception
        throw new NotFoundException('User not found');
      }

      const isPasswordValid = await bcrypt.compare(
        signInDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }

      const payload = {
        username: user.email,
        sub: user.id,
      };
      console.log('PAYLOAD IN SIGNIN: ', payload);
      const token = this.jwtService.sign(payload, {
        secret: 'COOLIOTOKEN',
      });
      if (!token) {
        throw new InternalServerErrorException();
      }
      console.log('TOKEN IN SIGNIN: ', { token, user });

      return {
        token,
        user,
      };
    } catch (error) {
      return new InternalServerErrorException();
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
        throw new NotFoundException('User not found');
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.prismaService.user.findUnique({
      where: { username: payload.username },
    });
  }

  // sign up method
  async signUp(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = await this.prismaService.user.create({
        data: {
          email: createUserDto.email,
          password: hashedPassword,
          lastSeen: new Date(),
          role: 'USER',
          lastName: createUserDto.lastName,
          firstName: createUserDto.firstName,
          username: createUserDto.username,
          bio: createUserDto.bio,
          avatar: createUserDto.profilePicture,
        },
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // brute force attack prevention on more than 5 failed login attempts
  async lockAccount(email: string): Promise<User> {
    try {
      const user = await this.prismaService.user.update({
        where: {
          email: email,
        },
        data: {
          isLocked: true,
        },
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // async signOut(signOut: SignOutDto): Promise<User> {
  //   try {
  //     const user = await this.prismaService.user.update({
  //       where: {
  //         email: signOut.email,
  //       },
  //       data: {
  //         lastSeen: new Date(),
  //       },
  //     });
  //     return user;
  //   } catch (error) {
  //     throw new InternalServerErrorException();
  //   }
  // }
}
