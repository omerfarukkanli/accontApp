import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { SuccessResponseDto } from 'src/generic/dto/successResponse.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(email: string, password: string): Promise<SuccessResponseDto> {
    const user = await this.userService.findOne(email);
    if (user) {
      throw new HttpException(
        'Kullanıcı halihazırda var.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const salt = await bcrypt.genSalt();

    const hash = await bcrypt.hash(password, salt);
    const createdUser = await this.userService.create({
      email,
      password: hash,
    });

    const payload = {
      sub: createdUser._id,
      email: createdUser.email,
    };

    return new SuccessResponseDto(
      true,
      HttpStatus.OK,
      'Kullanıcı başarıyla oluşturuldu.',
      {
        access_token: this.jwtService.sign(payload, {
          secret: 'secret',
        }),
      },
    );
  }
  async signIn(email: string, password: string): Promise<SuccessResponseDto> {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new HttpException('Kullanıcı bulunamadı.', HttpStatus.NOT_FOUND);
    }
    const payload = {
      sub: user._id,
      email: user.email,
    };
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new HttpException('Yetkisiz giriş.', HttpStatus.UNAUTHORIZED);
    }

    return new SuccessResponseDto(
      true,
      HttpStatus.OK,
      'Başarıyla giriş yapıldı',
      {
        access_token: this.jwtService.sign(payload, {
          secret: 'secret',
        }),
      },
    );
  }
}
