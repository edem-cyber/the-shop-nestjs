import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';

@Module({
  imports: [
    NestJwtModule.register({
      secret: 'COOLIO', // replace with your own secret key
      signOptions: { expiresIn: '1h' }, // token will expire in 1 hour
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
