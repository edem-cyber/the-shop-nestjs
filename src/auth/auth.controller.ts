import {
  Controller,
  // Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  // @Post('signout')
  // signOut(@Body() signOutDto: SignOutDto) {
  //   // Call auth service signOut method
  //   return this.authService.signOut(signOutDto);
  // }
}
