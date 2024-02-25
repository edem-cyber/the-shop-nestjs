import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly nestJwtService: NestJwtService) {}

  async sign(payload: any): Promise<string> {
    try {
      console.log('PAYLOAD IN JWT SERVICE: ', payload);
      return this.nestJwtService.sign(payload);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async verify(token: string): Promise<any> {
    try {
      return this.nestJwtService.verify(token);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
