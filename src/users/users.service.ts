import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
    try {
      return this.prisma.user.create({
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
}
