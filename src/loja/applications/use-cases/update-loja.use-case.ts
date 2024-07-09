import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { IUseCase } from '@shared/application/use-case.interface';

import { Loja } from '../../domain/entities/loja.entity';
import {
  IFindableLojaById,
  IUpdatableLoja,
} from '../../domain/repositories/loja.repository.interface';
import { UpdateLojaDTO } from '../dtos/update-loja.dto';

type InputProps = UpdateLojaDTO & {
  id: number;
};

export class UpdateLojaUseCase implements IUseCase<InputProps, Loja> {
  constructor(private readonly repository: IUpdatableLoja & IFindableLojaById) {}

  async execute({ id, descricao }: InputProps): Promise<Loja> {
    const lojaProps = await this.repository.findById(id).catch(() => {
      throw new InternalServerErrorException();
    });

    if (!lojaProps) {
      throw new NotFoundException();
    }

    const lojaEither = Loja.factory(lojaProps);

    if (lojaEither.isLeft()) {
      throw new UnprocessableEntityException(lojaEither.value.join(', '));
    }

    const loja = lojaEither.value;
    const lojaUpdatedEither = loja.update(descricao);

    if (lojaUpdatedEither.isLeft()) {
      throw new BadRequestException(lojaUpdatedEither.value.join(', '));
    }

    const lojaUpdated = lojaUpdatedEither.value;
    await this.repository.update(lojaUpdated).catch(() => {
      throw new InternalServerErrorException();
    });

    return lojaUpdated;
  }
}
