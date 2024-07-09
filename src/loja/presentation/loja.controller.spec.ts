import { IUseCase } from '@shared/application/use-case.interface';

import { CreateLojaDTO } from '../applications/dtos/create-loja.dto';
import { Loja } from '../domain/entities/loja.entity';
import { LojaController } from './loja.controller';

describe(LojaController.name, () => {
  let controller: LojaController;
  let useCase: jest.Mocked<IUseCase<CreateLojaDTO, Loja>>;

  beforeEach(async () => {
    useCase = {
      execute: jest.fn(),
    };

    controller = new LojaController(useCase);
  });

  describe(LojaController.prototype.create.name, () => {
    it('Deve retornar LOJA quando a chamada for bem sucedida', async () => {
      const lojaStub = {
        id: 1,
        descricao: 'Some description',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
      useCase.execute.mockResolvedValueOnce(lojaStub);

      const output = await controller.create({ descricao: 'Some description' });
      expect(output).toStrictEqual(lojaStub);
    });

    it('Deve falhar quando o use case falhar', () => {
      const errorStub = new Error('Some message error');
      useCase.execute.mockRejectedValueOnce(errorStub);

      const promiseOutput = controller.create({
        descricao: 'Some descricao',
      });

      expect(promiseOutput).rejects.toThrow(errorStub);
    });
  });
});
