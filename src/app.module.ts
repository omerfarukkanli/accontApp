import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.contoller';
import { BankController } from './bank/bank.controller';
import { BankModule } from './bank/bank.module';
@Module({
  imports: [
    AuthModule,
    UserModule,
    BankModule,
    MongooseModule.forRoot(
      'mongodb+srv://kanlomerfaruk:deneme123@db.qlx3v.mongodb.net/',
    ),
  ],
  controllers: [AuthController, BankController],
  providers: [],
})
export class AppModule {}
