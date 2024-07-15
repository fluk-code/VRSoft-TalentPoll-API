import {
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { IUseCase } from '@shared/application/use-case.interface';

import { Produto } from '../../domain/entities/produto.entity';
import {
  IFindableProdutoById,
  IUpdatableProduto,
} from '../../domain/repositories/produto.repository.interface';
import { AddPrecoProdutoDTO } from '../dtos/add-preco.dto';

export type InputProps = AddPrecoProdutoDTO & {
  id: number;
};

export class AddPrecoProdutoUseCase implements IUseCase<InputProps, Produto> {
  constructor(private readonly repository: IFindableProdutoById & IUpdatableProduto) {}

  async execute({ id, idLoja, precoVenda }: InputProps): Promise<Produto> {
    const produtoProps = await this.repository.findById(id).catch(() => {
      throw new InternalServerErrorException();
    });

    if (!produtoProps) {
      throw new NotFoundException();
    }

    const produtoEither = Produto.factory(produtoProps);

    if (produtoEither.isLeft()) {
      throw new UnprocessableEntityException();
    }

    const produtoEntity = produtoEither.value;
    const updatedEither = produtoEntity.addPreco(Number(idLoja), precoVenda);

    if (updatedEither.isLeft()) {
      throw new UnprocessableEntityException();
    }

    const produtoUpdatedEntity = updatedEither.value;
    await this.repository.update(produtoUpdatedEntity).catch((error: Error) => {
      console.error(error);

      throw new InternalServerErrorException(error);
    });

    return produtoUpdatedEntity;
  }
}
