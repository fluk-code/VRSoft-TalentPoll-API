import {
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { IUseCase } from '@shared/application/use-case.interface';

import { Produto } from '../../domain/entities/produto.entity';
import { IFindableProdutoById } from '../../domain/repositories/produto.repository.interface';

export class FindProdutoByIdUseCase implements IUseCase<number, Produto> {
  constructor(private readonly repository: IFindableProdutoById) {}

  async execute(id: number): Promise<Produto> {
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

    return produtoEither.value;
  }
}
