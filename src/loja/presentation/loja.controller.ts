import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';

import { SearchOutputDTO } from '@shared/application/dtos/search-output.dto';
import { IUseCase } from '@shared/application/use-case.interface';

import { CreateLojaDTO } from '../applications/dtos/create-loja.dto';
import { SearchInputLojaDTO } from '../applications/dtos/search-loja.dto';
import { UpdateLojaDTO } from '../applications/dtos/update-loja.dto';
import { CreateLojaUseCase } from '../applications/use-cases/create-loja.use-case';
import { DeleteLojaUseCase } from '../applications/use-cases/delete-loja.use-case';
import { FindLojaByIdUseCase } from '../applications/use-cases/find-loja-by-id.use-case';
import { SearchLojaUseCase } from '../applications/use-cases/search-loja.use-case';
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
    private readonly deleteLojaUseCase: IUseCase<number, void>,

    @Inject(FindLojaByIdUseCase)
    private readonly fndLojaByIDUseCase: IUseCase<number, Loja>,

    @Inject(SearchLojaUseCase)
    private readonly searchLojaUseCase: IUseCase<SearchInputLojaDTO, SearchOutputDTO<Loja>>
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

  @Get('/:id')
  async findByID(@Param('id') id: number): Promise<Loja> {
    return this.fndLojaByIDUseCase.execute(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.deleteLojaUseCase.execute(id);
  }

  @Get('/')
  async search(@Query() queryParams: SearchInputLojaDTO): Promise<SearchOutputDTO<Loja>> {
    console.log(queryParams.filter);

    return this.searchLojaUseCase.execute(queryParams);
  }
}
