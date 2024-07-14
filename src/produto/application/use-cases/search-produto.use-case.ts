import { InternalServerErrorException } from '@nestjs/common';

import { SearchOutputDTO } from '@shared/application/dtos/search-output.dto';
import { IUseCase } from '@shared/application/use-case.interface';

import { ProdutoDTO } from '../../domain/dtos/produto.dto';
import { ISearchableProduto } from '../../domain/repositories/produto.repository.interface';
import { SearchInputProdutoDTO, SearchProdutoOutputDTO } from '../dtos/search-produto.dto';

export class SearchProdutoUseCase
  implements IUseCase<SearchInputProdutoDTO, SearchOutputDTO<ProdutoDTO>>
{
  constructor(private readonly repository: ISearchableProduto) {}

  async execute(input: SearchInputProdutoDTO): Promise<SearchOutputDTO<ProdutoDTO>> {
    const { rows: data, total } = await this.repository.search(input).catch((error: Error) => {
      console.error(error);
      throw new InternalServerErrorException(error);
    });

    return new SearchProdutoOutputDTO({
      data,
      page: input.page,
      perPage: input.perPage,
      total,
    });
  }
}
