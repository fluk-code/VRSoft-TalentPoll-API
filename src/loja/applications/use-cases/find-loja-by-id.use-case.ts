import {
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { IUseCase } from '@shared/application/use-case.interface';

import { Loja } from '../../domain/entities/loja.entity';
import { IFindableLojaById } from '../../domain/repositories/loja.repository.interface';

export class FindLojaByIdUseCase implements IUseCase<number, Loja> {
  constructor(private readonly repository: IFindableLojaById) {}

  async execute(id: number): Promise<Loja> {
    const lojaProps = await this.repository.findById(id).catch(() => {
      throw new InternalServerErrorException();
    });

    if (!lojaProps) {
      throw new NotFoundException();
    }

    const lojaEither = Loja.factory(lojaProps);

    if (lojaEither.isLeft()) {
      throw new UnprocessableEntityException();
    }

    return lojaEither.value;
  }
}
