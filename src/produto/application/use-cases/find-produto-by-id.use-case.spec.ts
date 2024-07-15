import {
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { IFindableProdutoById } from '../../domain/repositories/produto.repository.interface';
import { FindProdutoByIdUseCase } from './find-produto-by-id.use-case';

describe(FindProdutoByIdUseCase.name, () => {
  let useCase: FindProdutoByIdUseCase;
  let repository: jest.Mocked<IFindableProdutoById>;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
    };
    useCase = new FindProdutoByIdUseCase(repository);
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
      custo: '0.000',
      imagem: '',
      precos: [
        {
          idLoja: 1,
          idProduto: 1,
          precoVenda: '10.000',
        },
      ],
    });

    const output = await useCase.execute(1);

    expect(output.toJSON()).toStrictEqual({
      id: 1,
      descricao: 'Some description',
      custo: '0.000',
      imagem: '',
      precos: [
        {
          idLoja: 1,
          idProduto: 1,
          precoVenda: '10.000',
        },
      ],
    });
  });
});
