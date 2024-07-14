import { InternalServerErrorException } from '@nestjs/common';

import { IUseCase } from '@shared/application/use-case.interface';

import { LojaDTO } from '../../domain/dtos/loja.dto';
import { IFindableAllLojaById } from '../../domain/repositories/loja.repository.interface';

export class FindAllLojaByIdUseCase implements IUseCase<void, LojaDTO[]> {
  constructor(private readonly repository: IFindableAllLojaById) {}

  async execute(): Promise<LojaDTO[]> {
    return this.repository.findAllById().catch(() => {
      throw new InternalServerErrorException();
    });
  }
}
