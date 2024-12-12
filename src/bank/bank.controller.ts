import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { BankService } from './bank.service';
import { CreateBankDto } from './dto/create_bank.dto';
import { Response, Request } from 'express';
import { SuccessResponseDto } from 'src/generic/dto/successResponse.dto';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/gurad/auth.gurad';

@Controller('bank')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class BankController {
  constructor(private bankservice: BankService) {}

  @Post()
  async create(
    @Body() body: CreateBankDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const userId = req.user['sub'];
    console.log(userId);
    const response: SuccessResponseDto = await this.bankservice.create(
      body,
      userId,
    );
    res.status(HttpStatus.OK).send(response);
  }

  @Get()
  async findAll(@Res() res: Response, @Req() req: Request) {
    const userId = req.user['sub'];
    const response: SuccessResponseDto = await this.bankservice.findAll(userId);
    res.status(HttpStatus.OK).send(response);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', required: true })
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req.user['sub'];
    const response: SuccessResponseDto = await this.bankservice.findOne(
      id,
      userId,
    );
    res.status(HttpStatus.OK).send(response);
  }

  @Patch('/:id')
  @ApiParam({ name: 'id', required: true })
  async update(
    @Param('id') id: string,
    @Body() body: CreateBankDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req.user['sub'];
    const response: SuccessResponseDto = await this.bankservice.update(
      id,
      body,
      userId,
    );
    res.status(HttpStatus.OK).send(response);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true })
  async delete(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req.user['sub'];
    const response: SuccessResponseDto = await this.bankservice.delete(
      id,
      userId,
    );
    res.status(HttpStatus.OK).send(response);
  }
}
