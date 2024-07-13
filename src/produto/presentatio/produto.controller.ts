import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';

import { SearchOutputDTO } from '@shared/application/dtos/search-output.dto';
import { IUseCase } from '@shared/application/use-case.interface';

import { CreateProdutoDTO } from '../application/dtos/create-produto.dto';
import { SearchInputProdutoDTO } from '../application/dtos/search-produto.dto';
import { UpdateProdutoDTO } from '../application/dtos/update-produto.dto';
import { CreateProdutoUseCase } from '../application/use-cases/create-produto.use-case';
import { DeleteProdutoUseCase } from '../application/use-cases/delete-produto.use-case';
import { FindProdutoByIdUseCase } from '../application/use-cases/find-produto-by-id.use-case';
import { SearchProdutoUseCase } from '../application/use-cases/search-produto.use-case';
import { InputProps, UpdateProdutoUseCase } from '../application/use-cases/update-produto.use-case';
import { Produto } from '../domain/entities/produto.entity';

@Controller('produtos')
export class ProdutoController {
  constructor(
    @Inject(CreateProdutoUseCase)
    private readonly createUseCase: IUseCase<CreateProdutoDTO, Produto>,

    @Inject(FindProdutoByIdUseCase)
    private readonly fndByIDUseCase: IUseCase<number, Produto>,

    @Inject(UpdateProdutoUseCase)
    private readonly updateUseCase: IUseCase<InputProps, Produto>,

    @Inject(DeleteProdutoUseCase)
    private readonly deleteUseCase: IUseCase<number, void>,

    @Inject(SearchProdutoUseCase)
    private readonly searchUseCase: IUseCase<SearchInputProdutoDTO, SearchOutputDTO<Produto>>
  ) {}

  @Post('/')
  async create(@Body() body: CreateProdutoDTO): Promise<Produto> {
    return this.createUseCase.execute(body);
  }

  @Get('/:id')
  async findByID(@Param('id') id: number): Promise<Produto> {
    return this.fndByIDUseCase.execute(id);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() body: UpdateProdutoDTO): Promise<Produto> {
    return this.updateUseCase.execute({
      id,
      ...body,
    });
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.deleteUseCase.execute(id);
  }

  @Get('/')
  async search(@Query() queryParams: SearchInputProdutoDTO): Promise<SearchOutputDTO<Produto>> {
    return this.searchUseCase.execute(queryParams);
  }
}
