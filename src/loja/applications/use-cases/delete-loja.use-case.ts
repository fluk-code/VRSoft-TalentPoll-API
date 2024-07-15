import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { IUseCase } from '@shared/application/use-case.interface';

import {
  IDeletableLoja,
  IFindableLojaById,
} from '../../domain/repositories/loja.repository.interface';

export class DeleteLojaUseCase implements IUseCase<number, void> {
  constructor(private readonly repository: IFindableLojaById & IDeletableLoja) {}

  async execute(id: number): Promise<void> {
    const lojaProps = await this.repository.findById(id).catch(() => {
      throw new InternalServerErrorException();
    });

    if (!lojaProps) {
      throw new NotFoundException();
    }

    await this.repository.delete(id).catch(() => {
      throw new InternalServerErrorException();
    });
  }
}
