import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
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

      this.prisma.user.create({
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
          dateOfBirth: dateOfBirthWithTime,
          avatar: profilePicture,
        },
      });
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
      return this.prisma.user.update({
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

  // delelte all users and return the number of users deleted, total number of users left
  async deleteAllUsers(): Promise<{
    deletedUsers: number;
    remainingUsers: number;
  }> {
    try {
      const allUsers = await this.prisma.user.findMany();
      const deletedUsers = await this.prisma.user.deleteMany();
      return {
        deletedUsers: deletedUsers.count,
        remainingUsers: allUsers.length - deletedUsers.count,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
