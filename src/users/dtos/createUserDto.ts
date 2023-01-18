import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ default: 'john@doe.com' })
  @Transform(({ value }) => value.toLowerCase())
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'John' })
  @IsString()
  firstname: string;

  @ApiProperty({ default: 'Doe' })
  @IsString()
  lastname: string;

  @ApiProperty({ default: 'password' })
  @IsString()
  password: string;
}

export class ShrinkUserDto {
  @ApiProperty({ default: 'john@doe.com' })
  @Transform(({ value }) => value.toLowerCase())
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'password' })
  @IsString()
  password: string;
}
