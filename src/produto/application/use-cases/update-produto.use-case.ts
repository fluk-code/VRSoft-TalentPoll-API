import {
  BadRequestException,
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
import { UpdateProdutoDTO } from '../dtos/update-produto.dto';

export type InputProps = UpdateProdutoDTO & {
  id: number;
};

export class UpdateProdutoUseCase implements IUseCase<InputProps, Produto> {
  constructor(private readonly repository: IUpdatableProduto & IFindableProdutoById) {}

  async execute({ id, ...updateProps }: InputProps): Promise<Produto> {
    const produtoProps = await this.repository.findById(id).catch(() => {
      throw new InternalServerErrorException();
    });

    if (!produtoProps) {
      throw new NotFoundException();
    }

    const produtoEither = Produto.factory(produtoProps);

    if (produtoEither.isLeft()) {
      throw new UnprocessableEntityException(produtoEither.value.join(', '));
    }

    const produto = produtoEither.value;
    const produtoUpdatedEither = produto.update(updateProps);

    if (produtoUpdatedEither.isLeft()) {
      throw new BadRequestException(produtoUpdatedEither.value.join(', '));
    }

    const produtoUpdated = produtoUpdatedEither.value;
    await this.repository.update(produtoUpdated).catch(() => {
      throw new InternalServerErrorException();
    });

    return produtoUpdated;
  }
}
