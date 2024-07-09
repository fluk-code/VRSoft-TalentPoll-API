import { IUseCase } from '@shared/application/use-case.interface';

import { CreateLojaDTO } from '../applications/dtos/create-loja.dto';
import { InputProps } from '../applications/use-cases/update-loja.use-case';
import { Loja } from '../domain/entities/loja.entity';
import { LojaController } from './loja.controller';

describe(LojaController.name, () => {
  let controller: LojaController;
  let creteUseCase: jest.Mocked<IUseCase<CreateLojaDTO, Loja>>;
  let updateUseCase: jest.Mocked<IUseCase<InputProps, Loja>>;

  beforeEach(async () => {
    creteUseCase = {
      execute: jest.fn(),
    };

    updateUseCase = {
      execute: jest.fn(),
    };

    controller = new LojaController(creteUseCase, updateUseCase);
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
});
