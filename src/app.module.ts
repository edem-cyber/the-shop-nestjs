import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { KModule } from './k/k.module';

@Module({
  imports: [UsersModule, PrismaModule, KModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
