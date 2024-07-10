import { ILike, Repository } from 'typeorm';

import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { QueryBuilder } from '@shared/infra/typeorm/helpers/query.builder';

import {
  FilterLojaDTO,
  SearchInputLojaDTO,
  SortLojaDTO,
} from '../../../../applications/dtos/search-loja.dto';
import { LojaDTO } from '../../../../domain/dtos/loja.dto';
import { Loja } from '../../../../domain/entities/loja.entity';
import {
  IDeletableLoja,
  IFindableLojaById,
  ISavableLoja,
  ISearchableLoja,
  IUpdatableLoja,
} from '../../../../domain/repositories/loja.repository.interface';
import LojaTypeOrm from '../entities/loja-typeorm.entity';
import { LojaQueryBuilder } from '../helpers/loja-query.builder';

export class LojaTypeOrmRepository
  implements ISavableLoja, IFindableLojaById, IUpdatableLoja, IDeletableLoja, ISearchableLoja
{
  constructor(
    @InjectRepository(LojaTypeOrm)
    private readonly typeOrm: Repository<LojaTypeOrm>,

    @Inject(LojaQueryBuilder)
    private readonly queryBuilder: QueryBuilder<FilterLojaDTO, SortLojaDTO>
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

  async delete(id: number): Promise<void> {
    await this.typeOrm.delete(id);
  }

  async search({
    filter,
    sort,
    page,
    perPage,
  }: SearchInputLojaDTO): Promise<{ rows: LojaDTO[]; total: number }> {
    const query = this.queryBuilder
      .addWhereCondition('id', filter.id)
      .addWhereCondition('descricao', filter.descricao && ILike(`%${filter.descricao}%`))
      .addOrderCondition('id', sort.id)
      .addOrderCondition('descricao', sort.descricao)
      .andPaginate(page, perPage)
      .build();

    const [rows, total] = await this.typeOrm.findAndCount(query);

    return {
      rows,
      total,
    };
  }
}
