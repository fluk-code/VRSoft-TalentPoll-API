/* eslint-disable sonarjs/no-duplicate-string */
import {
  BadRequestException,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Loja } from '../../domain/entities/loja.entity';
import { ISavableLoja } from '../../domain/repositories/loja.repository';
import { CreateLojaDTO } from '../dtos/create-loja.dto';
import { CreateLojaUseCase } from './create-loja.use-case';

describe(CreateLojaUseCase.name, () => {
  let useCase: CreateLojaUseCase;
  let repository: jest.Mocked<ISavableLoja>;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
    };
    useCase = new CreateLojaUseCase(repository);
  });

  it('Deve retornar a entidade Loja quando a chamada for bem sucedida', async () => {
    const input: CreateLojaDTO = {
      descricao: 'Some value',
    };

    const lojaPropsStub = {
      ...input,
      id: 1,
    };

    repository.save.mockResolvedValueOnce(lojaPropsStub);

    const output = await useCase.execute(input);

    expect(output).toBeInstanceOf(Loja);
    expect(output.toJSON()).toStrictEqual(lojaPropsStub);
  });

  it('Deve lançar BadRequestException quando descricao recebida for invalida', () => {
    const input: CreateLojaDTO = {
      descricao: 1 as unknown as string,
    };

    const promiseOutput = useCase.execute(input);

    expect(promiseOutput).rejects.toThrow(BadRequestException);
  });

  it('Deve lançar InternalServerErrorException quando repositorio falhar', () => {
    repository.save.mockRejectedValueOnce(new Error());

    const input: CreateLojaDTO = {
      descricao: 'Some value',
    };

    const promiseOutput = useCase.execute(input);

    expect(promiseOutput).rejects.toThrow(InternalServerErrorException);
  });

  it('Deve lançar UnprocessableEntityException quando repositorio retornar dto invalido', () => {
    repository.save.mockResolvedValueOnce({
      id: undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    const input: CreateLojaDTO = {
      descricao: 'Some value',
    };

    const promiseOutput = useCase.execute(input);

    expect(promiseOutput).rejects.toThrow(UnprocessableEntityException);
  });
});
