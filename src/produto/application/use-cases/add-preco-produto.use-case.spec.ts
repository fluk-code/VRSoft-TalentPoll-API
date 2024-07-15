/* eslint-disable sonarjs/no-duplicate-string */
import {
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import {
  IFindableProdutoById,
  IUpdatableProduto,
} from '../../domain/repositories/produto.repository.interface';
import { AddPrecoProdutoDTO } from '../dtos/add-preco.dto';
import { AddPrecoProdutoUseCase } from './add-preco-produto.use-case';

describe(AddPrecoProdutoUseCase.name, () => {
  let useCase: AddPrecoProdutoUseCase;
  let repository: jest.Mocked<IFindableProdutoById & IUpdatableProduto>;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
      update: jest.fn(),
    };
    useCase = new AddPrecoProdutoUseCase(repository);
  });

  it('Deve lançar NotFoundException quando recurso nao for encontrado', () => {
    repository.findById.mockResolvedValue(null);

    const input: AddPrecoProdutoDTO = {
      idLoja: 1,
      precoVenda: '0.000',
    };

    const promiseOutput = useCase.execute({
      ...input,
      id: 1,
    });

    expect(promiseOutput).rejects.toThrow(NotFoundException);
  });

  it('Deve lançar InternalServerErrorException quando repositorio.findById falhar', () => {
    repository.findById.mockRejectedValueOnce(new Error());

    const input: AddPrecoProdutoDTO = {
      idLoja: 1,
      precoVenda: '0.000',
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

    const input: AddPrecoProdutoDTO = {
      idLoja: 1,
      precoVenda: '10.000',
    };

    const promiseOutput = useCase.execute({
      ...input,
      id: 1,
    });

    expect(promiseOutput).rejects.toThrow(UnprocessableEntityException);
  });

  it('Deve lançar UnprocessableEntityException quando descricao recebida for invalida', () => {
    repository.findById.mockResolvedValue({
      id: 1,
      descricao: 'Some description',
    });

    const input: AddPrecoProdutoDTO = {
      idLoja: undefined as unknown as number,
      precoVenda: '0.000',
    };

    const promiseOutput = useCase.execute({
      ...input,
      id: 1,
    });

    expect(promiseOutput).rejects.toThrow(UnprocessableEntityException);
  });

  it('Deve lançar InternalServerErrorException quando repositorio.update falhar', () => {
    repository.findById.mockResolvedValue({
      id: 1,
      descricao: 'Some description',
    });

    repository.update.mockRejectedValueOnce(new Error());

    const input: AddPrecoProdutoDTO = {
      idLoja: 1,
      precoVenda: '0.000',
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

    repository.update.mockResolvedValueOnce();

    const input: AddPrecoProdutoDTO = {
      idLoja: 7,
      precoVenda: '10.123',
    };

    const output = await useCase.execute({
      ...input,
      id: 1,
    });

    expect(output.toJSON()).toStrictEqual({
      id: 1,
      descricao: 'Some description',
      imagem: '',
      custo: '0.000',
      precos: [
        {
          idLoja: 7,
          idProduto: 1,
          precoVenda: '10.123',
        },
      ],
    });
  });
});
