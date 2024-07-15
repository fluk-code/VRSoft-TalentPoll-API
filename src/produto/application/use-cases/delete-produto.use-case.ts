import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { IUseCase } from '@shared/application/use-case.interface';

import {
  IDeletableProduto,
  IFindableProdutoById,
} from '../../domain/repositories/produto.repository.interface';

export class DeleteProdutoUseCase implements IUseCase<number, void> {
  constructor(private readonly repository: IFindableProdutoById & IDeletableProduto) {}

  async execute(id: number): Promise<void> {
    const produtoProps = await this.repository.findById(id).catch(() => {
      throw new InternalServerErrorException();
    });

    if (!produtoProps) {
      throw new NotFoundException();
    }

    await this.repository.delete(id).catch(() => {
      throw new InternalServerErrorException();
    });
  }
}
