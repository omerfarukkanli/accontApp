import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bank } from './schema/bank.schema';
import { Model } from 'mongoose';
import { CreateBankDto } from './dto/create_bank.dto';
import { SuccessResponseDto } from 'src/generic/dto/successResponse.dto';

@Injectable()
export class BankService {
  constructor(@InjectModel(Bank.name) private bankModel: Model<Bank>) {}

  async create(createBankDto: CreateBankDto): Promise<SuccessResponseDto> {
    try {
      const bank = new this.bankModel(createBankDto);
      const createdBank = await bank.save();

      return new SuccessResponseDto(
        true,
        HttpStatus.CREATED,
        'Ürün oluşturuldu',
        { bank: createdBank },
      );
    } catch (error) {
      throw new HttpException(
        error,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<SuccessResponseDto> {
    try {
      const banks = await this.bankModel.find();
      return new SuccessResponseDto(true, HttpStatus.OK, '', {
        bank: banks,
      });
    } catch (error) {
      throw new HttpException(
        error,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<SuccessResponseDto> {
    try {
      const bank = await this.bankModel.findById(id);
      return new SuccessResponseDto(true, HttpStatus.OK, '', {
        bank,
      });
    } catch (error) {
      throw new HttpException(
        error,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    updateBankDto: CreateBankDto,
  ): Promise<SuccessResponseDto> {
    try {
      const updatedBank = await this.bankModel.findByIdAndUpdate(
        id,
        updateBankDto,
      );
      return new SuccessResponseDto(true, HttpStatus.OK, '', {
        bank: updatedBank,
      });
    } catch (error) {
      throw new HttpException(
        error,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async delete(id: string): Promise<SuccessResponseDto> {
    try {
      await this.bankModel.findByIdAndDelete(id);
      return new SuccessResponseDto(true, HttpStatus.OK, 'Banka silindi');
    } catch (error) {
      throw new HttpException(
        error,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
