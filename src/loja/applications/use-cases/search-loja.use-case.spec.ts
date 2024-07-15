import { InternalServerErrorException } from '@nestjs/common';

import { LojaDTO } from '../../domain/dtos/loja.dto';
import { ISearchableLoja } from '../../domain/repositories/loja.repository.interface';
import { SearchInputLojaDTO, SearchLojaOutputDTO } from '../dtos/search-loja.dto';
import { SearchLojaUseCase } from './search-loja.use-case';

describe(SearchLojaUseCase.name, () => {
  let useCase: SearchLojaUseCase;
  let repository: jest.Mocked<ISearchableLoja>;

  beforeEach(() => {
    repository = {
      search: jest.fn(),
    };
    useCase = new SearchLojaUseCase(repository);
  });

  it('Deve lançar InternalServerErrorException quando repositorio.search falhar', () => {
    repository.search.mockRejectedValueOnce(new Error());

    const inputSearchFake = new SearchInputLojaDTO();

    const promiseOutput = useCase.execute(inputSearchFake);
    expect(promiseOutput).rejects.toThrow(InternalServerErrorException);
  });

  it('Deve retornar a SearchLojaOutputDTO quando a chamada for bem sucedida', async () => {
    const rowsFake = ['some loja 1', 'some loja 2'] as unknown as LojaDTO[];
    const totalFake = 100;
    repository.search.mockResolvedValue({
      rows: rowsFake,
      total: totalFake,
    });

    const inputSearchFake = new SearchInputLojaDTO();
    const output = await useCase.execute(inputSearchFake);

    expect(output.toJSON()).toStrictEqual(
      new SearchLojaOutputDTO({
        data: rowsFake,
        page: inputSearchFake.page,
        perPage: inputSearchFake.perPage,
        total: totalFake,
      }).toJSON()
    );
  });
});
