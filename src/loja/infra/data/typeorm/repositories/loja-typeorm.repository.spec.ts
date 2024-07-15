/* eslint-disable sonarjs/no-duplicate-string */
import { ILike, Repository } from 'typeorm';

import { QueryBuilder } from '@shared/infra/typeorm/helpers/query.builder';

import {
  FilterLojaDTO,
  SearchInputLojaDTO,
  SortLojaDTO,
} from '../../../../applications/dtos/search-loja.dto';
import LojaTypeOrm from '../entities/loja-typeorm.entity';
import { LojaTypeOrmRepository } from './loja-typeorm.repository';

describe(LojaTypeOrmRepository.name, () => {
  let repository: LojaTypeOrmRepository;
  let typeOrm: jest.Mocked<Repository<LojaTypeOrm>>;
  let queryBuilder: jest.Mocked<QueryBuilder<FilterLojaDTO, SortLojaDTO>>;

  beforeEach(() => {
    typeOrm = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
      findAndCount: jest.fn(),
    } as unknown as jest.Mocked<Repository<LojaTypeOrm>>;

    queryBuilder = {
      addWhereCondition: jest.fn().mockReturnThis(),
      addOrderCondition: jest.fn().mockReturnThis(),
      andPaginate: jest.fn().mockReturnThis(),
      build: jest.fn().mockReturnThis(),
    } as unknown as jest.Mocked<QueryBuilder<FilterLojaDTO, SortLojaDTO>>;

    repository = new LojaTypeOrmRepository(typeOrm, queryBuilder);
  });

  describe(LojaTypeOrmRepository.prototype.save.name, () => {
    it('Deve retornar LojaDTO quando a chamada for bem sucedida', async () => {
      const lojaStub = {
        id: 1,
        descricao: 'Some description',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
      typeOrm.save.mockResolvedValueOnce(lojaStub);

      const output = await repository.save({ descricao: 'Some description' });
      expect(output).toStrictEqual(lojaStub);
    });

    it('Deve falhar quando o typeOrm falhar', () => {
      const errorStub = new Error('Some message error');
      typeOrm.save.mockRejectedValueOnce(errorStub);

      const promiseOutput = repository.save({ descricao: 'Some description' });
      expect(promiseOutput).rejects.toThrow(errorStub);
    });
  });

  describe(LojaTypeOrmRepository.prototype.update.name, () => {
    it('Deve retornar void quando a chamada for bem sucedida', async () => {
      const lojaStub = {
        toJSON: () => ({
          id: 1,
          descricao: 'New description',
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
      typeOrm.save.mockResolvedValueOnce(lojaStub);

      const output = await repository.update(lojaStub);
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

  describe(LojaTypeOrmRepository.prototype.findById.name, () => {
    it('Deve retornar LojaDTO quando o id for encontrado', async () => {
      const lojaStub = {
        id: 1,
        descricao: 'Some description',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
      typeOrm.findOne.mockResolvedValueOnce(lojaStub);

      const output = await repository.findById(1);
      expect(output).toStrictEqual(lojaStub);
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

  describe(LojaTypeOrmRepository.prototype.delete.name, () => {
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

  describe(LojaTypeOrmRepository.prototype.findAll.name, () => {
    it('Deve retornar lista de LojaDTO quando a chamada for bem sucedida', async () => {
      const lojaListStub = [
        {
          id: 1,
          descricao: 'Some description',
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any;
      typeOrm.find.mockResolvedValueOnce(lojaListStub);

      const output = await repository.findAll();
      expect(output).toStrictEqual(lojaListStub);
    });

    it('Deve falhar quando o typeOrm falhar', () => {
      const errorStub = new Error('Some message error');
      typeOrm.find.mockRejectedValueOnce(errorStub);

      const promiseOutput = repository.findAll();
      expect(promiseOutput).rejects.toThrow(errorStub);
    });
  });

  describe(LojaTypeOrmRepository.prototype.search.name, () => {
    it('Deve retornar a lista de loja e quantidade de registo quando a chamada for bem sucedida', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lojaFakeList = ['Some loja', 'Some loja 2'] as any;
      const totalFake = 10;
      typeOrm.findAndCount.mockResolvedValueOnce([lojaFakeList, totalFake]);
      const searchInputDtoStub = new SearchInputLojaDTO();

      const output = await repository.search(searchInputDtoStub);
      expect(output.rows).toBe(lojaFakeList);
      expect(output.total).toBe(totalFake);
    });

    it('Deve falhar quando o typeOrm falhar', () => {
      const errorStub = new Error('Some message error');
      typeOrm.findAndCount.mockRejectedValueOnce(errorStub);

      const searchInputDtoStub = new SearchInputLojaDTO();

      const promiseOutput = repository.search(searchInputDtoStub);
      expect(promiseOutput).rejects.toThrow(errorStub);
    });

    it('Deve adicionar ILike quando filter.descricao for informado', async () => {
      typeOrm.findAndCount.mockResolvedValueOnce([[], 10]);

      const searchInputDtoStub = new SearchInputLojaDTO();
      const filterFake = {
        id: undefined,
        descricao: 'some filter',
      };
      searchInputDtoStub.filter = JSON.stringify(filterFake);

      await repository.search(searchInputDtoStub);
      expect(queryBuilder.addWhereCondition).toHaveReturnedTimes(2);
      expect(queryBuilder.addWhereCondition).toHaveBeenNthCalledWith(
        2,
        'descricao',
        ILike(`%${filterFake.descricao}%`)
      );
    });

    it('Deve adicionar passar o valor recebido quando filter.id for informado', async () => {
      typeOrm.findAndCount.mockResolvedValueOnce([[], 10]);

      const searchInputDtoStub = new SearchInputLojaDTO();
      const filterFake = {
        id: 1,
        descricao: undefined,
      };
      searchInputDtoStub.filter = JSON.stringify(filterFake);

      await repository.search(searchInputDtoStub);
      expect(queryBuilder.addWhereCondition).toHaveReturnedTimes(2);
      expect(queryBuilder.addWhereCondition).toHaveBeenNthCalledWith(1, 'id', filterFake.id);
    });

    it('Deve adicionar  passar o valor recebido quando sort.descricao for informado', async () => {
      typeOrm.findAndCount.mockResolvedValueOnce([[], 10]);

      const searchInputDtoStub = new SearchInputLojaDTO();
      const sortFake = {
        id: undefined,
        descricao: 'ASC',
      };
      searchInputDtoStub.sort = JSON.stringify(sortFake);

      await repository.search(searchInputDtoStub);
      expect(queryBuilder.addOrderCondition).toHaveReturnedTimes(2);
      expect(queryBuilder.addOrderCondition).toHaveBeenNthCalledWith(
        2,
        'descricao',
        sortFake.descricao
      );
    });

    it('Deve adicionar  passar o valor recebido quando filter.id for informado', async () => {
      typeOrm.findAndCount.mockResolvedValueOnce([[], 10]);

      const searchInputDtoStub = new SearchInputLojaDTO();
      const sortFake = {
        id: 'DESC',
        descricao: undefined,
      };
      searchInputDtoStub.sort = JSON.stringify(sortFake);

      await repository.search(searchInputDtoStub);
      expect(queryBuilder.addOrderCondition).toHaveReturnedTimes(2);
      expect(queryBuilder.addOrderCondition).toHaveBeenNthCalledWith(1, 'id', sortFake.id);
    });

    it('Deve adicionar passar perPage e perPage recebidos', async () => {
      typeOrm.findAndCount.mockResolvedValueOnce([[], 10]);

      const searchInputDtoStub = new SearchInputLojaDTO();
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
