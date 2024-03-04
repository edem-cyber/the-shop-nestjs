import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    try {
      if (err || !user) {
        throw err || new UnauthorizedException();
      }
      return user;
    } catch (error) {
      // THROW error based on either info or err arguments
      if (error.message === 'invalid token') {
        throw new UnauthorizedException('Invalid Token');
      }
      if (error.message === 'jwt expired') {
        throw new UnauthorizedException('Token Expired');
      }
      if (info.message === 'jwt malformed') {
        throw new UnauthorizedException('Malformed Token');
      }
    }
  }
}
