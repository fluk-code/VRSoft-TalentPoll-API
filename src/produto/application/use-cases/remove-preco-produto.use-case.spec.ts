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
import { RemovePrecoProdutoUseCase } from './remove-preco-produto.use-case';

describe(RemovePrecoProdutoUseCase.name, () => {
  let useCase: RemovePrecoProdutoUseCase;
  let repository: jest.Mocked<IFindableProdutoById & IUpdatableProduto>;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
      update: jest.fn(),
    };
    useCase = new RemovePrecoProdutoUseCase(repository);
  });

  it('Deve lançar NotFoundException quando recurso nao for encontrado', () => {
    repository.findById.mockResolvedValue(null);

    const promiseOutput = useCase.execute({
      id: 1,
      idLoja: 3,
    });

    expect(promiseOutput).rejects.toThrow(NotFoundException);
  });

  it('Deve lançar InternalServerErrorException quando repositorio.findById falhar', () => {
    repository.findById.mockRejectedValueOnce(new Error());

    const promiseOutput = useCase.execute({
      id: 1,
      idLoja: 3,
    });

    expect(promiseOutput).rejects.toThrow(InternalServerErrorException);
  });

  it('Deve lançar UnprocessableEntityException quando repositorio retornar dto invalido', () => {
    repository.findById.mockResolvedValueOnce({
      id: undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    const promiseOutput = useCase.execute({
      id: 1,
      idLoja: 3,
    });

    expect(promiseOutput).rejects.toThrow(UnprocessableEntityException);
  });

  it('Deve lançar UnprocessableEntityException quando descricao recebida for invalida', () => {
    repository.findById.mockResolvedValue({
      id: 1,
      descricao: 'Some description',
    });

    const promiseOutput = useCase.execute({
      id: 1,
      idLoja: undefined as unknown as number,
    });

    expect(promiseOutput).rejects.toThrow(UnprocessableEntityException);
  });

  it('Deve lançar InternalServerErrorException quando repositorio.update falhar', () => {
    repository.findById.mockResolvedValue({
      id: 1,
      descricao: 'Some description',
    });

    repository.update.mockRejectedValueOnce(new Error());

    const promiseOutput = useCase.execute({
      id: 1,
      idLoja: 3,
    });

    expect(promiseOutput).rejects.toThrow(InternalServerErrorException);
  });

  it('Deve retornar a entidade Produto atualizado quando a chamada for bem sucedida', async () => {
    repository.findById.mockResolvedValue({
      id: 1,
      descricao: 'Some description',
      custo: '0.000',
      imagem: '',
      precos: [
        {
          idLoja: 3,
          idProduto: 1,
          precoVenda: '11.111',
        },
        {
          idLoja: 7,
          idProduto: 1,
          precoVenda: '10.123',
        },
      ],
    });

    repository.update.mockResolvedValueOnce();

    const output = await useCase.execute({
      id: 1,
      idLoja: 3,
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
