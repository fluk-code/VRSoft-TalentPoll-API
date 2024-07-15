import { InternalServerErrorException } from '@nestjs/common';

import { ProdutoDTO } from '../../domain/dtos/produto.dto';
import { ISearchableProduto } from '../../domain/repositories/produto.repository.interface';
import { SearchInputProdutoDTO, SearchProdutoOutputDTO } from '../dtos/search-produto.dto';
import { SearchProdutoUseCase } from './search-produto.use-case';

describe(SearchProdutoUseCase.name, () => {
  let useCase: SearchProdutoUseCase;
  let repository: jest.Mocked<ISearchableProduto>;

  beforeEach(() => {
    repository = {
      search: jest.fn(),
    };
    useCase = new SearchProdutoUseCase(repository);
  });

  it('Deve lançar InternalServerErrorException quando repositorio.search falhar', () => {
    repository.search.mockRejectedValueOnce(new Error());

    const inputSearchFake = new SearchInputProdutoDTO();

    const promiseOutput = useCase.execute(inputSearchFake);
    expect(promiseOutput).rejects.toThrow(InternalServerErrorException);
  });

  it('Deve retornar a SearchProdutoOutputDTO quando a chamada for bem sucedida', async () => {
    const rowsFake = ['some produto 1', 'some produto 2'] as unknown as ProdutoDTO[];
    const totalFake = 100;
    repository.search.mockResolvedValue({
      rows: rowsFake,
      total: totalFake,
    });

    const inputSearchFake = new SearchInputProdutoDTO();
    const output = await useCase.execute(inputSearchFake);

    expect(output.toJSON()).toStrictEqual(
      new SearchProdutoOutputDTO({
        data: rowsFake,
        page: inputSearchFake.page,
        perPage: inputSearchFake.perPage,
        total: totalFake,
      }).toJSON()
    );
  });
});
