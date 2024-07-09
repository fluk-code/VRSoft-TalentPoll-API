import {
  BadRequestException,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { IUseCase } from '@shared/application/use-case.interface';
import { Descricao } from '@shared/domain/value-objects/descricao.vo';

import { Loja } from '../../domain/entities/loja.entity';
import { ISavableLoja } from '../../domain/repositories/loja.repository';
import { CreateLojaDTO } from '../dtos/create-loja.dto';

export class CreateLojaUseCase implements IUseCase<CreateLojaDTO, Loja> {
  constructor(private readonly repository: ISavableLoja) {}

  async execute(input: CreateLojaDTO): Promise<Loja> {
    const descricaoEither = Descricao.factory(input.descricao);

    if (descricaoEither.isLeft()) {
      throw new BadRequestException(descricaoEither.value);
    }

    const descricaoVo = descricaoEither.value;

    const lojaProps = await this.repository
      .save({
        descricao: descricaoVo.value,
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });

    const lojaEither = Loja.factory(lojaProps);

    if (lojaEither.isLeft()) {
      throw new UnprocessableEntityException(lojaEither.value);
    }

    return lojaEither.value;
  }
}
