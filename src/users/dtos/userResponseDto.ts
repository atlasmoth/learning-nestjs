import { IsString, IsEmail, IsDate, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserResponseDto {
  @ApiProperty({ default: 'john@doe.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'John' })
  @IsString()
  firstname: string;

  @ApiProperty({ default: 'Doe' })
  @IsString()
  @Expose()
  lastname: string;

  @ApiProperty()
  @IsDate()
  created_at: Date;

  @ApiProperty()
  @IsDate()
  updated_at: Date;

  @ApiProperty({ default: false })
  @IsBoolean()
  is_admin: boolean;
}

export class ResponseWithToken {
  @ApiProperty({
    default:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AZG9lLmNvbSIsImlhdCI6MTY3NDA0MjQ5M30.GQGbDAjTHyroACnuY5a-03ae6L64WeW6I1msDzPwmdw',
  })
  @IsString()
  token: string;

  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;
}
