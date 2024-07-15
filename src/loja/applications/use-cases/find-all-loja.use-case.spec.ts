import { InternalServerErrorException } from '@nestjs/common';

import { IFindableAll } from '../../domain/repositories/loja.repository.interface';
import { FindAllLojaUseCase } from './find-all-loja.use-case';

describe(FindAllLojaUseCase.name, () => {
  let useCase: FindAllLojaUseCase;
  let repository: jest.Mocked<IFindableAll>;

  beforeEach(() => {
    repository = {
      findAll: jest.fn(),
    };
    useCase = new FindAllLojaUseCase(repository);
  });

  it('Deve lançar InternalServerErrorException quando repositorio.findById falhar', () => {
    repository.findAll.mockRejectedValueOnce(new Error());

    const promiseOutput = useCase.execute();
    expect(promiseOutput).rejects.toThrow(InternalServerErrorException);
  });

  it('Deve retornar a lista de LojaDTO quando a chamada for bem sucedida', async () => {
    repository.findAll.mockResolvedValue([
      {
        id: 1,
        descricao: 'Some description',
      },
    ]);

    const output = await useCase.execute();

    expect(output).toStrictEqual([
      {
        id: 1,
        descricao: 'Some description',
      },
    ]);
  });
});
