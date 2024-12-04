import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/auth/dto/createUser.ts';
import { SuccessResponseDto } from 'src/generic/dto/successResponse.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: CreateUserDto, @Res() res: Response) {
    const response: SuccessResponseDto = await this.authService.signUp(
      body.email,
      body.password,
    );
    res.status(HttpStatus.CREATED).send(response);
  }
  @Post('signin')
  async signin(@Body() signup: CreateUserDto, @Res() res: Response) {
    const response: SuccessResponseDto = await this.authService.signIn(
      signup.email,
      signup.password,
    );
    res.status(HttpStatus.OK).send(response);
  }
}
