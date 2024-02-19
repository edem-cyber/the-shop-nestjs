import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<any> {
    try {
      const users = await this.prisma.user.findMany();
      const count = await this.prisma.user.count();

      return {
        count,
        users,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const {
      email,
      password,
      username,
      firstName,
      lastName,
      phone,
      bio,
      address,
      dateOfBirth,
      profilePicture,
    } = createUserDto;
    const dateOfBirthWithTime = `${dateOfBirth}T00:00:00.000Z`;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      // check if user with email already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });

      const existingUsername = await this.prisma.user.findUnique({
        where: { username: createUserDto.username },
      });

      if (existingUser || existingUsername) {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }

      return this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          username,
          firstName,
          lastName,
          phoneNumber: phone,
          bio,
          address: {
            create: {
              address,
            },
          },
          dateOfBirth: dateOfBirthWithTime,
          avatar: profilePicture,
        },
      });

      // const payload = { email: existingUser.email, id: existingUser.id };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  //   get user by id
  async getUserById(id: string): Promise<User> {
    try {
      return this.prisma.user.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  //   get user by email
  async getUserByEmail(email: string): Promise<User> {
    try {
      return this.prisma.user.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  //   update user by id
  async updateUserById(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const {
      email,
      password,
      username,
      firstName,
      lastName,
      phone,
      bio,
      address,
      dateOfBirth,
      profilePicture,
    } = updateUserDto;
    try {
      const user = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          email,
          password,
          username,
          firstName,
          lastName,
          phoneNumber: phone,
          bio,
          address: {
            create: {
              address,
            },
          },
          dateOfBirth,
          avatar: profilePicture,
        },
      });

      // const payload = {
      //   id: user.id,
      //   email: user.email,
      //   firstName: user.firstName,
      // };

      // Generate token
      // const token = await this.jwtService.sign(payload);

      // Return the user and the token
      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  //   delete user by id
  async deleteUserById(id: string): Promise<User> {
    try {
      const deleltedUser = this.prisma.user.delete({
        where: {
          id,
        },
      });
      return deleltedUser;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // delete all users
  async deleteAllUsers(): Promise<any> {
    try {
      return this.prisma.user.deleteMany();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // search user by username
  async searchUserByUsername(username: string): Promise<User[]> {
    try {
      return this.prisma.user.findMany({
        where: {
          username: {
            contains: username,
          },
        },
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
