/* eslint-disable sonarjs/no-duplicate-string */
import {
  BadRequestException,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Produto } from '../../domain/entities/produto.entity';
import { ISavableProduto } from '../../domain/repositories/produto.repository.interface';
import { CreateProdutoDTO } from '../dtos/create-produto.dto';
import { CreateProdutoUseCase } from './create-produto.use-case';

describe(CreateProdutoUseCase.name, () => {
  let useCase: CreateProdutoUseCase;
  let repository: jest.Mocked<ISavableProduto>;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
    };
    useCase = new CreateProdutoUseCase(repository);
  });

  it('Deve retornar a entidade Produto quando a chamada for bem sucedida', async () => {
    const input: CreateProdutoDTO = {
      descricao: 'Some value',
      custo: '10.000',
      imagem: '',
    };

    const produtoPropsStub = {
      ...input,
      id: 1,
    };

    repository.save.mockResolvedValueOnce(produtoPropsStub);

    const output = await useCase.execute(input);

    expect(output).toBeInstanceOf(Produto);
    expect(output.toJSON()).toStrictEqual({
      ...produtoPropsStub,
      precos: [],
    });
  });

  it('Deve lançar BadRequestException quando descricao recebida for invalida', () => {
    const input: CreateProdutoDTO = {
      descricao: undefined as unknown as string,
      custo: '10.000',
      imagem: '',
    };

    const promiseOutput = useCase.execute(input);

    expect(promiseOutput).rejects.toThrow(BadRequestException);
  });

  it('Deve lançar InternalServerErrorException quando repositorio falhar', () => {
    repository.save.mockRejectedValueOnce(new Error());

    const input: CreateProdutoDTO = {
      descricao: 'Some value',
      custo: '10.000',
      imagem: '',
    };

    const promiseOutput = useCase.execute(input);

    expect(promiseOutput).rejects.toThrow(InternalServerErrorException);
  });

  it('Deve lançar UnprocessableEntityException quando repositorio retornar dto invalido', () => {
    repository.save.mockResolvedValueOnce({
      id: undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    const input: CreateProdutoDTO = {
      descricao: 'Some value',
      custo: '10.000',
      imagem: '',
    };

    const promiseOutput = useCase.execute(input);

    expect(promiseOutput).rejects.toThrow(UnprocessableEntityException);
  });
});
