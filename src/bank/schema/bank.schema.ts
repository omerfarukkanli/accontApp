import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { DebtType } from 'src/generic/enum/debtType.enum';

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
    enum: DebtType,
    type: String,
    default: DebtType.CREDIT_CARD,
  })
  debtType: DebtType;

  @Prop({
    required: true,
    type: Number,
    default: 0,
  })
  totalDebt: number;

  @Prop({
    required: true,
    type: Number,
    default: 0,
  })
  balance: number;

  @Prop({
    required: true,
    type: Number,
    default: 0,
  })
  monthlyPayment: number;
}

export const BankSchema = SchemaFactory.createForClass(Bank);
