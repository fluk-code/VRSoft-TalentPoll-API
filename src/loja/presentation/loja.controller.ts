import { Body, Controller, Delete, Inject, Param, Post, Put } from '@nestjs/common';

import { IUseCase } from '@shared/application/use-case.interface';

import { CreateLojaDTO } from '../applications/dtos/create-loja.dto';
import { UpdateLojaDTO } from '../applications/dtos/update-loja.dto';
import { CreateLojaUseCase } from '../applications/use-cases/create-loja.use-case';
import { DeleteLojaUseCase } from '../applications/use-cases/delete-loja.use-case';
import { InputProps, UpdateLojaUseCase } from '../applications/use-cases/update-loja.use-case';
import { Loja } from '../domain/entities/loja.entity';

@Controller('lojas')
export class LojaController {
  constructor(
    @Inject(CreateLojaUseCase)
    private readonly createLojaUseCase: IUseCase<CreateLojaDTO, Loja>,

    @Inject(UpdateLojaUseCase)
    private readonly updateLojaUseCase: IUseCase<InputProps, Loja>,

    @Inject(DeleteLojaUseCase)
    private readonly deleteLojaUseCase: IUseCase<number, void>
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

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.deleteLojaUseCase.execute(id);
  }
}
