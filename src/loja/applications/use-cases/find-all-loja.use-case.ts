import { InternalServerErrorException } from '@nestjs/common';

import { IUseCase } from '@shared/application/use-case.interface';

import { LojaDTO } from '../../domain/dtos/loja.dto';
import { IFindableAll } from '../../domain/repositories/loja.repository.interface';

export class FindAllLojaUseCase implements IUseCase<void, LojaDTO[]> {
  constructor(private readonly repository: IFindableAll) {}

  async execute(): Promise<LojaDTO[]> {
    return this.repository.findAll().catch(() => {
      throw new InternalServerErrorException();
    });
  }
}
