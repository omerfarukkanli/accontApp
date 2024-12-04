import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.contoller';
@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://kanlomerfaruk:deneme123@db.qlx3v.mongodb.net/',
    ),
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
