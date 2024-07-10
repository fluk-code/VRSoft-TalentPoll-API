/* eslint-disable sonarjs/no-duplicate-string */
import { Repository } from 'typeorm';

import LojaTypeOrm from '../entities/loja-typeorm.entity';
import { LojaTypeOrmRepository } from './loja-typeorm.repository';

describe(LojaTypeOrmRepository.name, () => {
  let repository: LojaTypeOrmRepository;
  let typeOrm: jest.Mocked<Repository<LojaTypeOrm>>;

  beforeEach(() => {
    typeOrm = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<Repository<LojaTypeOrm>>;

    repository = new LojaTypeOrmRepository(typeOrm);
  });

  describe(LojaTypeOrmRepository.prototype.save.name, () => {
    it('Deve retornar LojaDTO quando a chamada for bem sucedida', async () => {
      const lojaStub = {
        id: 1,
        descricao: 'Some description',
      };
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
      };
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
});
