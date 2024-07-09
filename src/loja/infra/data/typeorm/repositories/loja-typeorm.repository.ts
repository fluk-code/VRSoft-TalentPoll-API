import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

import { LojaDTO } from '../../../../domain/dtos/loja.dto';
import { Loja } from '../../../../domain/entities/loja.entity';
import {
  IFindableLojaById,
  ISavableLoja,
  IUpdatableLoja,
} from '../../../../domain/repositories/loja.repository.interface';
import LojaTypeOrm from '../entities/loja-typeorm.entity';

export class LojaTypeOrmRepository implements ISavableLoja, IFindableLojaById, IUpdatableLoja {
  constructor(
    @InjectRepository(LojaTypeOrm)
    private readonly typeOrm: Repository<LojaTypeOrm>
  ) {}

  async save(dto: Omit<LojaDTO, 'id'>): Promise<LojaDTO> {
    const typeOrmEntity = this.typeOrm.create(dto);
    return this.typeOrm.save(typeOrmEntity);
  }

  async update(loja: Loja): Promise<void> {
    const typeOrmEntity = this.typeOrm.create(loja.toJSON());
    await this.typeOrm.save(typeOrmEntity);
  }

  async findById(id: number): Promise<LojaDTO | null> {
    return await this.typeOrm.findOne({
      where: {
        id,
      },
    });
  }
}
