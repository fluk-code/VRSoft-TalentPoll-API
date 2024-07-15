/* eslint-disable sonarjs/no-duplicate-string */
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import {
  IFindableProdutoById,
  IUpdatableProduto,
} from '../../domain/repositories/produto.repository.interface';
import { UpdateProdutoDTO } from '../dtos/update-produto.dto';
import { UpdateProdutoUseCase } from './update-produto.use-case';

describe(UpdateProdutoUseCase.name, () => {
  let useCase: UpdateProdutoUseCase;
  let repository: jest.Mocked<IFindableProdutoById & IUpdatableProduto>;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
      update: jest.fn(),
    };
    useCase = new UpdateProdutoUseCase(repository);
  });

  it('Deve lançar NotFoundException quando recurso nao for encontrado', () => {
    repository.findById.mockResolvedValue(null);

    const input: UpdateProdutoDTO = {
      descricao: 'New description',
      custo: '0.000',
    };

    const promiseOutput = useCase.execute({
      ...input,
      id: 1,
    });

    expect(promiseOutput).rejects.toThrow(NotFoundException);
  });

  it('Deve lançar InternalServerErrorException quando repositorio.findById falhar', () => {
    repository.findById.mockRejectedValueOnce(new Error());

    const input: UpdateProdutoDTO = {
      descricao: 'New value',
      custo: '10.000',
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

    const input: UpdateProdutoDTO = {
      descricao: 'New value',
      custo: '0.000',
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

    const input: UpdateProdutoDTO = {
      descricao: 1 as unknown as string,
      custo: '1.000',
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

    const input: UpdateProdutoDTO = {
      descricao: 'New description',
      custo: '0.000',
    };

    const promiseOutput = useCase.execute({
      ...input,
      id: 1,
    });

    expect(promiseOutput).rejects.toThrow(InternalServerErrorException);
  });

  it('Deve retornar a entidade Produto atualizado quando a chamada for bem sucedida', async () => {
    repository.findById.mockResolvedValue({
      id: 1,
      descricao: 'Some description',
    });

    repository.update.mockResolvedValue();

    const input: UpdateProdutoDTO = {
      descricao: 'New description',
      custo: '0.000',
    };

    const output = await useCase.execute({
      ...input,
      id: 1,
    });

    expect(output.toJSON()).toStrictEqual({
      id: 1,
      descricao: 'New description',
      imagem: '',
      custo: '0.000',
      precos: [],
    });
  });
});
