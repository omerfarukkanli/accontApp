import { ApiProperty } from '@nestjs/swagger';
import { Credit } from 'src/generic/types/credit.type';

interface ICreateBank {
  name: string;
  totalDebt: number;
  balance: number;
  credits: Credit[];
}

export class CreateBankDto implements ICreateBank {
  @ApiProperty({ default: 'Bank of America' })
  name: string;
  @ApiProperty({ default: 10000 })
  totalDebt: number;
  @ApiProperty({ default: 10000 })
  balance: number;
  @ApiProperty({
    type: [Object],
    example: [
      {
        installmentAmount: 100,
        totalInstallments: 10,
        monthlyPayment: 1000,
        interestRate: 0.1,
        startDate: '2021-01-01',
      },
    ],
  })
  credits: Credit[];
}
