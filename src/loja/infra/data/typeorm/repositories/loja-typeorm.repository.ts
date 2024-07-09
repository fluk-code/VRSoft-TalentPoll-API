import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

import { LojaDTO } from '../../../../domain/dtos/loja.dto';
import { ISavableLoja } from '../../../../domain/repositories/loja.repository.interface';
import LojaTypeOrm from '../entities/loja-typeorm.entity';

export class LojaTypeOrmRepository implements ISavableLoja {
  constructor(
    @InjectRepository(LojaTypeOrm)
    private readonly typeOrm: Repository<LojaTypeOrm>
  ) {}

  async save(dto: Omit<LojaDTO, 'id'>): Promise<LojaDTO> {
    const typeOrmEntity = this.typeOrm.create(dto);
    return this.typeOrm.save(typeOrmEntity);
  }
}
