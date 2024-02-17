/* eslint-disable @typescript-eslint/no-unused-vars */
import { UsersService } from './users.service';
// import @get
import {
  Get,
  Post,
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  NotFoundException,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Query,
  Patch,
  Delete,
  Search,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'The list of all users.',
  })
  @ApiForbiddenResponse()
  @ApiBadRequestResponse()
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async getAllUsers() {
    try {
      return this.usersService.getAllUsers();
    } catch (error) {
      // throw new BadRequestException(error);
      console.log(error);
    }
  }

  //   get user by email
  @Get('email')
  @ApiOperation({ summary: 'Get user by email' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
  })
  @ApiForbiddenResponse()
  @ApiBadRequestResponse()
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async getUserByEmail(@Param('email') email: string) {
    try {
      return this.usersService.getUserByEmail(email);
    } catch (error) {
      // throw new NotFoundException(error);
      console.log(error);
    }
  }

  //   get user by id
  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
  })
  @ApiForbiddenResponse()
  @ApiBadRequestResponse()
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async getUserById(@Param('id') id: string) {
    try {
      return this.usersService.getUserById(id);
    } catch (error) {
      // throw new NotFoundException(error);
      console.log(error);
    }
  }

  //   create user
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.createUser(createUserDto);
    } catch (error) {
      // throw new BadRequestException(error);
      console.log(error);
    }
  }

  //   update user by id
  @Patch(':id')
  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiForbiddenResponse()
  @ApiBadRequestResponse()
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return this.usersService.updateUserById(id, updateUserDto);
    } catch (error) {
      console.log(error);
    }
  }

  //   delete user by id
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @ApiForbiddenResponse()
  @ApiBadRequestResponse()
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async deleteUserById(@Param('id') id: string) {
    try {
      return this.usersService.deleteUserById(id);
    } catch (error) {
      console.log(error);
    }
  }

  // delelte all users and return the number of users deleted, total number of users left
  @Delete()
  @ApiOperation({ summary: 'Delete all users' })
  @ApiResponse({
    status: 200,
    description: 'The users have been successfully deleted.',
  })
  @ApiForbiddenResponse()
  @ApiBadRequestResponse()
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async deleteAllUsers() {
    try {
      return this.usersService.deleteAllUsers();
    } catch (error) {
      console.log(error);
    }
  }
}
