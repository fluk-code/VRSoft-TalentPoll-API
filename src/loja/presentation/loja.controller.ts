import { Body, Controller, Inject, Param, Post, Put } from '@nestjs/common';

import { IUseCase } from '@shared/application/use-case.interface';

import { CreateLojaDTO } from '../applications/dtos/create-loja.dto';
import { UpdateLojaDTO } from '../applications/dtos/update-loja.dto';
import { CreateLojaUseCase } from '../applications/use-cases/create-loja.use-case';
import { InputProps, UpdateLojaUseCase } from '../applications/use-cases/update-loja.use-case';
import { Loja } from '../domain/entities/loja.entity';

@Controller('lojas')
export class LojaController {
  constructor(
    @Inject(CreateLojaUseCase)
    private readonly createLojaUseCase: IUseCase<CreateLojaDTO, Loja>,

    @Inject(UpdateLojaUseCase)
    private readonly updateLojaUseCase: IUseCase<InputProps, Loja>
  ) {}

  @Post('/')
  async create(@Body() body: CreateLojaDTO): Promise<Loja> {
    return this.createLojaUseCase.execute(body);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() body: UpdateLojaDTO): Promise<Loja> {
    return this.updateLojaUseCase.execute({
      id,
      ...body,
    });
  }
}
