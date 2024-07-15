import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

import {
  IDeletableProduto,
  IFindableProdutoById,
} from '../../domain/repositories/produto.repository.interface';
import { DeleteProdutoUseCase } from './delete-produto.use-case';

describe(DeleteProdutoUseCase.name, () => {
  let useCase: DeleteProdutoUseCase;
  let repository: jest.Mocked<IFindableProdutoById & IDeletableProduto>;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
      delete: jest.fn(),
    };
    useCase = new DeleteProdutoUseCase(repository);
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

  it('Deve lançar InternalServerErrorException quando repositorio.delete falhar', () => {
    repository.findById.mockResolvedValueOnce({
      id: 1,
      descricao: 'Some description',
      custo: '10',
      imagem: '',
    });
    repository.delete.mockRejectedValueOnce(new Error());

    const promiseOutput = useCase.execute(1);
    expect(promiseOutput).rejects.toThrow(InternalServerErrorException);
  });

  it('Deve retornar void quando a chamada for bem sucedida', async () => {
    repository.findById.mockResolvedValue({
      id: 1,
      descricao: 'Some description',
      custo: '10',
      imagem: '',
    });
    repository.delete.mockResolvedValue();

    const output = await useCase.execute(1);

    expect(output).toBeUndefined();
  });
});
