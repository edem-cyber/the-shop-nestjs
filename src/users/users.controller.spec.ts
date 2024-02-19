import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
// import Prisma
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service'; // Import the UsersService

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService], // Provide the UsersService
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
