import {
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { IFindableLojaById } from '../../domain/repositories/loja.repository.interface';
import { FindLojaByIdUseCase } from './find-loja-by-id.use-case';

describe(FindLojaByIdUseCase.name, () => {
  let useCase: FindLojaByIdUseCase;
  let repository: jest.Mocked<IFindableLojaById>;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
    };
    useCase = new FindLojaByIdUseCase(repository);
  });

  it('Deve lançar NotFoundException quando recurso nao for encontrado', () => {
    repository.findById.mockResolvedValue(null);

    const promiseOutput = useCase.execute(1);
    expect(promiseOutput).rejects.toThrow(NotFoundException);
  });

  it('Deve lançar InternalServerErrorException quando repositorio.findById falhar', () => {
    repository.findById.mockRejectedValueOnce(new Error());

    const promiseOutput = useCase.execute(1);
    expect(promiseOutput).rejects.toThrow(InternalServerErrorException);
  });

  it('Deve lançar UnprocessableEntityException quando repositorio retornar dto invalido', () => {
    repository.findById.mockResolvedValueOnce({
      id: undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    const promiseOutput = useCase.execute(1);
    expect(promiseOutput).rejects.toThrow(UnprocessableEntityException);
  });

  it('Deve retornar a void quando a chamada for bem sucedida', async () => {
    repository.findById.mockResolvedValue({
      id: 1,
      descricao: 'Some description',
    });

    const output = await useCase.execute(1);

    expect(output.toJSON()).toStrictEqual({
      id: 1,
      descricao: 'Some description',
    });
  });
});
