import { ApiProperty } from '@nestjs/swagger';
import { DebtType } from 'src/generic/enum/debtType.enum';

export class CreateBankDto {
  @ApiProperty({ default: 'name' })
  name: string;
  @ApiProperty({ default: 10 })
  totalDebt: number;
  @ApiProperty({ default: 10 })
  balance: number;
  @ApiProperty({ default: 10 })
  monthlyPayment: number;
  @ApiProperty({ default: DebtType.CREDIT_CARD })
  deptType: DebtType;
}
