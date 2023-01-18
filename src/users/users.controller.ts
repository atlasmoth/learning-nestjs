import {
  Controller,
  Body,
  Post,
  Get,
  ForbiddenException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto, ShrinkUserDto } from './dtos/createUserDto';
import { ResponseWithToken, UserResponseDto } from './dtos/userResponseDto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiSecurity,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created',
    type: UserResponseDto,
  })
  async createUser(@Body() body: CreateUserDto) {
    let { email, firstname, lastname, password } = body;
    password = bcrypt.hashSync(password, 10);
    const user = await this.authService.create({
      email,
      lastname,
      firstname,
      password,
    });
    return user;
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login as a user' })
  @ApiResponse({
    status: 200,
    description: 'User created',
    type: ResponseWithToken,
  })
  async login(@Body() body: ShrinkUserDto) {
    let { email, password } = body;

    const user = await this.userService.fetchUserByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new ForbiddenException('Invalid credentials');
    }

    return { user, token: jwt.sign({ email }, process.env.JWT_SECRET) };
  }

  @Get()
  @ApiSecurity('x-api-key', ['x-api-key'])
  @ApiOperation({ summary: 'fetch all users' })
  @ApiResponse({
    status: 200,
    description: 'All users',
    isArray: true,
    type: UserResponseDto,
  })
  async getUsers() {
    return await this.userService.fetchUsers();
  }
}
