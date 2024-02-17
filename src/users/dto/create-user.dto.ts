import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  // fields for user model from prisma
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  @MinLength(3)
  lastName: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  phone: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  bio: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  address: string;

  @IsOptional()
  @IsString()
  dateOfBirth: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  profilePicture: string;
}
