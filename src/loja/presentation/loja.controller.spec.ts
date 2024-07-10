/* eslint-disable sonarjs/no-duplicate-string */
import { IUseCase } from '@shared/application/use-case.interface';

import { CreateLojaDTO } from '../applications/dtos/create-loja.dto';
import { InputProps } from '../applications/use-cases/update-loja.use-case';
import { Loja } from '../domain/entities/loja.entity';
import { LojaController } from './loja.controller';

describe(LojaController.name, () => {
  let controller: LojaController;
  let creteUseCase: jest.Mocked<IUseCase<CreateLojaDTO, Loja>>;
  let findByIdUseCase: jest.Mocked<IUseCase<number, Loja>>;
  let updateUseCase: jest.Mocked<IUseCase<InputProps, Loja>>;
  let deleteUseCase: jest.Mocked<IUseCase<number, void>>;

  beforeEach(async () => {
    creteUseCase = {
      execute: jest.fn(),
    };

    updateUseCase = {
      execute: jest.fn(),
    };

    deleteUseCase = {
      execute: jest.fn(),
    };

    findByIdUseCase = {
      execute: jest.fn(),
    };

    controller = new LojaController(creteUseCase, updateUseCase, deleteUseCase, findByIdUseCase);
  });

  describe(LojaController.prototype.create.name, () => {
    it('Deve retornar LOJA quando a chamada for bem sucedida', async () => {
      const lojaStub = {
        id: 1,
        descricao: 'Some description',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
      creteUseCase.execute.mockResolvedValueOnce(lojaStub);

      const output = await controller.create({ descricao: 'Some description' });
      expect(output).toStrictEqual(lojaStub);
    });

    it('Deve falhar quando o use case falhar', () => {
      const errorStub = new Error('Some message error');
      creteUseCase.execute.mockRejectedValueOnce(errorStub);

      const promiseOutput = controller.create({
        descricao: 'Some descricao',
      });

      expect(promiseOutput).rejects.toThrow(errorStub);
    });
  });

  describe(LojaController.prototype.update.name, () => {
    it('Deve retornar LOJA quando a chamada for bem sucedida', async () => {
      const lojaStub = {
        id: 1,
        descricao: 'New description',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
      updateUseCase.execute.mockResolvedValueOnce(lojaStub);

      const output = await controller.update(1, { descricao: 'New description' });
      expect(output).toStrictEqual(lojaStub);
    });

    it('Deve falhar quando o use case falhar', () => {
      const errorStub = new Error('Some message error');
      updateUseCase.execute.mockRejectedValueOnce(errorStub);

      const promiseOutput = controller.update(1, {
        descricao: 'New descricao',
      });

      expect(promiseOutput).rejects.toThrow(errorStub);
    });
  });

  describe(LojaController.prototype.delete.name, () => {
    it('Deve retornar LOJA quando a chamada for bem sucedida', async () => {
      deleteUseCase.execute.mockResolvedValueOnce();

      const output = await controller.delete(1);
      expect(output).toBeUndefined();
    });

    it('Deve falhar quando o use case falhar', () => {
      const errorStub = new Error('Some message error');
      deleteUseCase.execute.mockRejectedValueOnce(errorStub);

      const promiseOutput = controller.delete(1);
      expect(promiseOutput).rejects.toThrow(errorStub);
    });
  });

  describe(LojaController.prototype.findByID.name, () => {
    it('Deve retornar LOJA quando a chamada for bem sucedida', async () => {
      findByIdUseCase.execute.mockResolvedValueOnce({
        id: 1,
        descicao: 'Some Descricao',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

      const output = await controller.findByID(1);
      expect(output).toStrictEqual({ id: 1, descicao: 'Some Descricao' });
    });

    it('Deve falhar quando o use case falhar', () => {
      const errorStub = new Error('Some message error');
      findByIdUseCase.execute.mockRejectedValueOnce(errorStub);

      const promiseOutput = controller.findByID(1);
      expect(promiseOutput).rejects.toThrow(errorStub);
    });
  });
});
