import { IsEmail, IsString, IsNumber, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

export class RequestEmailDto {
  @IsEmail()
  email: string;
}

export class OtpDto {
  @IsNumber()
  otp: number;
}

export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @IsNumber()
  @MinLength(3)
  otp: number;

  @IsString()
  @MinLength(8)
  newPassword: string;
}
// Compare this snippet from src/auth/auth.service.ts:
