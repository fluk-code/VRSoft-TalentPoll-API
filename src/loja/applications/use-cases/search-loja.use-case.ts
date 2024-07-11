import { InternalServerErrorException } from '@nestjs/common';

import { SearchOutputDTO } from '@shared/application/dtos/search-output.dto';
import { IUseCase } from '@shared/application/use-case.interface';

import { LojaDTO } from '../../domain/dtos/loja.dto';
import { ISearchableLoja } from '../../domain/repositories/loja.repository.interface';
import { SearchInputLojaDTO, SearchLojaOutputDTO } from '../dtos/search-loja.dto';

export class SearchLojaUseCase implements IUseCase<SearchInputLojaDTO, SearchOutputDTO<LojaDTO>> {
  constructor(private readonly repository: ISearchableLoja) {}

  async execute(input: SearchInputLojaDTO): Promise<SearchOutputDTO<LojaDTO>> {
    const { rows: data, total } = await this.repository.search(input).catch(() => {
      throw new InternalServerErrorException();
    });

    return new SearchLojaOutputDTO({
      data,
      page: input.page,
      perPage: input.perPage,
      total,
    });
  }
}
