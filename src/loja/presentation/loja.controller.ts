import { Body, Controller, Inject, Post } from '@nestjs/common';

import { IUseCase } from '@shared/application/use-case.interface';

import { CreateLojaDTO } from '../applications/dtos/create-loja.dto';
import { CreateLojaUseCase } from '../applications/use-cases/create-loja.use-case';
import { Loja } from '../domain/entities/loja.entity';

@Controller('lojas')
export class LojaController {
  constructor(
    @Inject(CreateLojaUseCase)
    private readonly createLojaUseCase: IUseCase<CreateLojaDTO, Loja>
  ) {}

  @Post('/')
  async create(@Body() body: CreateLojaDTO): Promise<Loja> {
    return this.createLojaUseCase.execute(body);
  }
}
