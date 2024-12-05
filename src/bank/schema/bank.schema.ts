import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Credit } from 'src/generic/types/credit.type';
import { User } from 'src/user/user.schema';

export type BankDocument = HydratedDocument<Bank>;

@Schema({ timestamps: true })
export class Bank {
  @Prop({
    required: true,
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    type: Number,
    default: 0,
  })
  balance: number;

  @Prop({
    required: true,
    type: Object,
  })
  credits: Credit;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
}

export const BankSchema = SchemaFactory.createForClass(Bank);
