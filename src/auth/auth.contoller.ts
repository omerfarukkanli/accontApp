import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/auth/dto/createUser.ts';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: CreateUserDto, @Res() res: Response) {
    try {
      const response = await this.authService.signUp(body);
      res.status(HttpStatus.CREATED).send(response);
    } catch (error) {
      throw new HttpException(
        error,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('signin')
  async signin(@Body() signup: CreateUserDto, @Res() res: Response) {
    try {
      const response = await this.authService.signIn(signup.email);
      res.status(HttpStatus.OK).send(response);
    } catch (error) {
      throw new HttpException(
        error,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
