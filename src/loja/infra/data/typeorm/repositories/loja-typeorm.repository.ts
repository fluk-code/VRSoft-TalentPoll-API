import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

import { LojaDTO } from '../../../../domain/dtos/loja.dto';
import {
  IFindableLojaById,
  ISavableLoja,
} from '../../../../domain/repositories/loja.repository.interface';
import LojaTypeOrm from '../entities/loja-typeorm.entity';

export class LojaTypeOrmRepository implements ISavableLoja, IFindableLojaById {
  constructor(
    @InjectRepository(LojaTypeOrm)
    private readonly typeOrm: Repository<LojaTypeOrm>
  ) {}

  async save(dto: Omit<LojaDTO, 'id'>): Promise<LojaDTO> {
    const typeOrmEntity = this.typeOrm.create(dto);
    return this.typeOrm.save(typeOrmEntity);
  }

  async findById(id: number): Promise<LojaDTO | null> {
    return await this.typeOrm.findOne({
      where: {
        id,
      },
    });
  }
}
