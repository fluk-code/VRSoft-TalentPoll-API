/* eslint-disable sonarjs/no-duplicate-string */
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import {
  IFindableLojaById,
  IUpdatableLoja,
} from '../../domain/repositories/loja.repository.interface';
import { UpdateLojaDTO } from '../dtos/update-loja.dto';
import { UpdateLojaUseCase } from './update-loja.use-case';

describe(UpdateLojaUseCase.name, () => {
  let useCase: UpdateLojaUseCase;
  let repository: jest.Mocked<IFindableLojaById & IUpdatableLoja>;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
      update: jest.fn(),
    };
    useCase = new UpdateLojaUseCase(repository);
  });

  it('Deve lançar NotFoundException quando recurso nao for encontrado', () => {
    repository.findById.mockResolvedValue(null);

    const input: UpdateLojaDTO = {
      descricao: 'New description',
    };

    const promiseOutput = useCase.execute({
      ...input,
      id: 1,
    });

    expect(promiseOutput).rejects.toThrow(NotFoundException);
  });

  it('Deve lançar InternalServerErrorException quando repositorio.findById falhar', () => {
    repository.findById.mockRejectedValueOnce(new Error());

    const input: UpdateLojaDTO = {
      descricao: 'New value',
    };

    const promiseOutput = useCase.execute({
      ...input,
      id: 1,
    });

    expect(promiseOutput).rejects.toThrow(InternalServerErrorException);
  });

  it('Deve lançar UnprocessableEntityException quando repositorio retornar dto invalido', () => {
    repository.findById.mockResolvedValueOnce({
      id: undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    const input: UpdateLojaDTO = {
      descricao: 'New value',
    };

    const promiseOutput = useCase.execute({
      ...input,
      id: 1,
    });

    expect(promiseOutput).rejects.toThrow(UnprocessableEntityException);
  });

  it('Deve lançar BadRequestException quando descricao recebida for invalida', () => {
    repository.findById.mockResolvedValue({
      id: 1,
      descricao: 'Some description',
    });

    const input: UpdateLojaDTO = {
      descricao: 1 as unknown as string,
    };

    const promiseOutput = useCase.execute({
      ...input,
      id: 1,
    });

    expect(promiseOutput).rejects.toThrow(BadRequestException);
  });

  it('Deve lançar InternalServerErrorException quando repositorio.update falhar', () => {
    repository.findById.mockResolvedValue({
      id: 1,
      descricao: 'Some description',
    });

    repository.update.mockRejectedValueOnce(new Error());

    const input: UpdateLojaDTO = {
      descricao: 'New description',
    };

    const promiseOutput = useCase.execute({
      ...input,
      id: 1,
    });

    expect(promiseOutput).rejects.toThrow(InternalServerErrorException);
  });

  it('Deve retornar a entidade Loja atualizad quando a chamada for bem sucedida', async () => {
    repository.findById.mockResolvedValue({
      id: 1,
      descricao: 'Some description',
    });

    repository.update.mockResolvedValue();

    const input: UpdateLojaDTO = {
      descricao: 'New description',
    };

    const output = await useCase.execute({
      ...input,
      id: 1,
    });

    expect(output.toJSON()).toStrictEqual({
      id: 1,
      descricao: 'New description',
    });
  });
});
