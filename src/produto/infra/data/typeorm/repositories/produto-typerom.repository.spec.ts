/* eslint-disable sonarjs/no-duplicate-string */
import { ILike, Repository } from 'typeorm';

import { QueryBuilder } from '@shared/infra/typeorm/helpers/query.builder';

import {
  FilterProdutoDTO,
  SearchInputProdutoDTO,
  SortProdutoDTO,
} from '../../../../application/dtos/search-produto.dto';
import ProdutoTypeOrm from '../entities/produto-typeorm.entity';
import { ProdutoTypeOrmRepository } from './produto-typeorm.repository';

describe(ProdutoTypeOrmRepository.name, () => {
  let repository: ProdutoTypeOrmRepository;
  let typeOrm: jest.Mocked<Repository<ProdutoTypeOrm>>;
  let queryBuilder: jest.Mocked<QueryBuilder<FilterProdutoDTO, SortProdutoDTO>>;

  beforeEach(() => {
    typeOrm = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
      findAndCount: jest.fn(),
    } as unknown as jest.Mocked<Repository<ProdutoTypeOrm>>;

    queryBuilder = {
      addWhereCondition: jest.fn().mockReturnThis(),
      andWhereRelationCondition: jest.fn().mockReturnThis(),
      addOrderCondition: jest.fn().mockReturnThis(),
      andPaginate: jest.fn().mockReturnThis(),
      build: jest.fn().mockReturnThis(),
    } as unknown as jest.Mocked<QueryBuilder<FilterProdutoDTO, SortProdutoDTO>>;

    repository = new ProdutoTypeOrmRepository(typeOrm, queryBuilder);
  });

  describe(ProdutoTypeOrmRepository.prototype.save.name, () => {
    it('Deve retornar ProdutoDTO quando a chamada for bem sucedida', async () => {
      const produtoStub = {
        id: 1,
        descricao: 'Some description',
        custo: '10.123',
        image: '',
        precos: [],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
      typeOrm.save.mockResolvedValueOnce(produtoStub);

      const output = await repository.save({ descricao: 'Some description' });
      expect(output).toStrictEqual(produtoStub);
    });

    it('Deve falhar quando o typeOrm falhar', () => {
      const errorStub = new Error('Some message error');
      typeOrm.save.mockRejectedValueOnce(errorStub);

      const promiseOutput = repository.save({ descricao: 'Some description' });
      expect(promiseOutput).rejects.toThrow(errorStub);
    });
  });

  describe(ProdutoTypeOrmRepository.prototype.update.name, () => {
    it('Deve retornar void quando a chamada for bem sucedida', async () => {
      const produtoStub = {
        toJSON: () => ({
          id: 1,
          descricao: 'New description',
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
      typeOrm.save.mockResolvedValueOnce(produtoStub);

      const output = await repository.update(produtoStub);
      expect(output).toBeUndefined();
    });

    it('Deve falhar quando o typeOrm falhar', () => {
      const errorStub = new Error('Some message error');
      typeOrm.save.mockRejectedValueOnce(errorStub);

      const promiseOutput = repository.update({
        toJSON: () => ({ id: 1, descricao: 'Some description' }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      expect(promiseOutput).rejects.toThrow(errorStub);
    });
  });

  describe(ProdutoTypeOrmRepository.prototype.findById.name, () => {
    it('Deve retornar ProdutoDTO quando o id for encontrado', async () => {
      const produtoStub = {
        id: 1,
        descricao: 'Some description',
        custo: '10.123',
        image: '',
        precos: [],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
      typeOrm.findOne.mockResolvedValueOnce(produtoStub);

      const output = await repository.findById(1);
      expect(output).toStrictEqual(produtoStub);
    });

    it('Deve retorna null quando id nao for encontrado', async () => {
      typeOrm.findOne.mockResolvedValueOnce(null);

      const output = await repository.findById(1);
      expect(output).toBeNull();
    });

    it('Deve falhar quando o typeOrm falhar', () => {
      const errorStub = new Error('Some message error');
      typeOrm.findOne.mockRejectedValueOnce(errorStub);

      const promiseOutput = repository.findById(1);
      expect(promiseOutput).rejects.toThrow(errorStub);
    });
  });

  describe(ProdutoTypeOrmRepository.prototype.delete.name, () => {
    it('Deve retornar void quando a chamada for bem sucedida', async () => {
      const output = await repository.delete(1);
      expect(output).toBeUndefined();
    });

    it('Deve falhar quando o typeOrm falhar', () => {
      const errorStub = new Error('Some message error');
      typeOrm.delete.mockRejectedValueOnce(errorStub);

      const promiseOutput = repository.delete(1);
      expect(promiseOutput).rejects.toThrow(errorStub);
    });
  });

  describe(ProdutoTypeOrmRepository.prototype.search.name, () => {
    it('Deve retornar a lista de produto e quantidade de registo quando a chamada for bem sucedida', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const produtoFakeList = ['Some produto', 'Some produto 2'] as any;
      const totalFake = 10;
      typeOrm.findAndCount.mockResolvedValueOnce([produtoFakeList, totalFake]);
      const searchInputDtoStub = new SearchInputProdutoDTO();

      const output = await repository.search(searchInputDtoStub);
      expect(output.rows).toBe(produtoFakeList);
      expect(output.total).toBe(totalFake);
    });

    it('Deve falhar quando o typeOrm falhar', () => {
      const errorStub = new Error('Some message error');
      typeOrm.findAndCount.mockRejectedValueOnce(errorStub);

      const searchInputDtoStub = new SearchInputProdutoDTO();

      const promiseOutput = repository.search(searchInputDtoStub);
      expect(promiseOutput).rejects.toThrow(errorStub);
    });

    it('Deve adicionar ILike quando filter.descricao for informado', async () => {
      typeOrm.findAndCount.mockResolvedValueOnce([[], 10]);

      const searchInputDtoStub = new SearchInputProdutoDTO();
      const filterFake = {
        id: undefined,
        descricao: 'some filter',
      };
      searchInputDtoStub.filter = JSON.stringify(filterFake);

      await repository.search(searchInputDtoStub);
      expect(queryBuilder.addWhereCondition).toHaveReturnedTimes(3);
      expect(queryBuilder.addWhereCondition).toHaveBeenNthCalledWith(
        2,
        'descricao',
        ILike(`%${filterFake.descricao}%`)
      );
    });

    it('Deve adicionar passar o valor recebido quando filter.id for informado', async () => {
      typeOrm.findAndCount.mockResolvedValueOnce([[], 10]);

      const searchInputDtoStub = new SearchInputProdutoDTO();
      const filterFake = {
        id: 1,
        descricao: undefined,
      };
      searchInputDtoStub.filter = JSON.stringify(filterFake);

      await repository.search(searchInputDtoStub);
      expect(queryBuilder.addWhereCondition).toHaveReturnedTimes(3);
      expect(queryBuilder.addWhereCondition).toHaveBeenNthCalledWith(1, 'id', filterFake.id);
    });

    it('Deve adicionar passar o valor recebido quando filter.precos.precoVenda for informado', async () => {
      typeOrm.findAndCount.mockResolvedValueOnce([[], 10]);

      const searchInputDtoStub = new SearchInputProdutoDTO();
      const filterFake = {
        id: undefined,
        descricao: undefined,
        precos: {
          precoVenda: '10.123',
        },
      };
      searchInputDtoStub.filter = JSON.stringify(filterFake);

      await repository.search(searchInputDtoStub);
      expect(queryBuilder.andWhereRelationCondition).toHaveReturnedTimes(1);
      expect(queryBuilder.andWhereRelationCondition).toHaveBeenNthCalledWith(
        1,
        'precos',
        'precoVenda',
        filterFake.precos.precoVenda
      );
    });

    it('Deve adicionar  passar o valor recebido quando sort.descricao for informado', async () => {
      typeOrm.findAndCount.mockResolvedValueOnce([[], 10]);

      const searchInputDtoStub = new SearchInputProdutoDTO();
      const sortFake = {
        id: undefined,
        descricao: 'ASC',
      };
      searchInputDtoStub.sort = JSON.stringify(sortFake);

      await repository.search(searchInputDtoStub);
      expect(queryBuilder.addOrderCondition).toHaveReturnedTimes(3);
      expect(queryBuilder.addOrderCondition).toHaveBeenNthCalledWith(
        2,
        'descricao',
        sortFake.descricao
      );
    });

    it('Deve adicionar  passar o valor recebido quando filter.id for informado', async () => {
      typeOrm.findAndCount.mockResolvedValueOnce([[], 10]);

      const searchInputDtoStub = new SearchInputProdutoDTO();
      const sortFake = {
        id: 'DESC',
        descricao: undefined,
      };
      searchInputDtoStub.sort = JSON.stringify(sortFake);

      await repository.search(searchInputDtoStub);
      expect(queryBuilder.addOrderCondition).toHaveReturnedTimes(3);
      expect(queryBuilder.addOrderCondition).toHaveBeenNthCalledWith(1, 'id', sortFake.id);
    });

    it('Deve adicionar passar perPage e perPage recebidos', async () => {
      typeOrm.findAndCount.mockResolvedValueOnce([[], 10]);

      const searchInputDtoStub = new SearchInputProdutoDTO();
      searchInputDtoStub.perPage = 10;
      searchInputDtoStub.page = 2;

      await repository.search(searchInputDtoStub);
      expect(queryBuilder.andPaginate).toHaveReturnedTimes(1);
      expect(queryBuilder.andPaginate).toHaveBeenCalledWith(
        searchInputDtoStub.page,
        searchInputDtoStub.perPage
      );
    });
  });
});
