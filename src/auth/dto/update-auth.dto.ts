import { PartialType } from '@nestjs/mapped-types';
import {
  SignInDto,
  OtpDto,
  RequestEmailDto,
  ResetPasswordDto,
} from './create-auth.dto';

export class UpdateAuthDto extends PartialType(SignInDto) {}

export class UpdateOtpDto extends PartialType(OtpDto) {}

export class UpdateRequestEmailDto extends PartialType(RequestEmailDto) {}

export class UpdateResetPasswordDto extends PartialType(ResetPasswordDto) {}
