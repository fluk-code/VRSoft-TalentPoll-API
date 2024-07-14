import { ILike, Repository } from 'typeorm';

import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { QueryBuilder } from '@shared/infra/typeorm/helpers/query.builder';

import {
  FilterProdutoDTO,
  SearchInputProdutoDTO,
  SortProdutoDTO,
} from '../../../../application/dtos/search-produto.dto';
import { ProdutoDTO } from '../../../../domain/dtos/produto.dto';
import { Produto } from '../../../../domain/entities/produto.entity';
import {
  IDeletableProduto,
  IFindableProdutoById,
  ISavableProduto,
  IUpdatableProduto,
} from '../../../../domain/repositories/produto.repository.interface';
import ProdutoTypeOrm from '../entities/produto-typeorm.entity';
import { ProdutoQueryBuilder } from '../helpers/produto-query.builder';

export class ProdutoTypeOrmRepository
  implements ISavableProduto, IFindableProdutoById, IUpdatableProduto, IDeletableProduto
{
  constructor(
    @InjectRepository(ProdutoTypeOrm)
    private readonly typeOrm: Repository<ProdutoTypeOrm>,

    @Inject(ProdutoQueryBuilder)
    private readonly queryBuilder: QueryBuilder<FilterProdutoDTO, SortProdutoDTO>
  ) {}

  async save(dto: Omit<ProdutoDTO, 'id'>): Promise<ProdutoDTO> {
    const typeOrmEntity = this.typeOrm.create(dto);
    return this.typeOrm.save(typeOrmEntity);
  }

  async update(produto: Produto): Promise<void> {
    const typeOrmEntity = this.typeOrm.create(produto.toJSON());
    await this.typeOrm.save(typeOrmEntity);
  }

  async findById(id: number): Promise<ProdutoDTO | null> {
    return await this.typeOrm.findOne({
      where: {
        id,
      },
      relations: {
        precos: true,
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
  }: SearchInputProdutoDTO): Promise<{ rows: ProdutoDTO[]; total: number }> {
    const query = this.queryBuilder
      .addWhereCondition('id', filter.id)
      .addWhereCondition('descricao', filter.descricao && ILike(`%${filter.descricao}%`))
      .addWhereCondition('custo', filter.custo)
      .andWhereRelationCondition('precos', 'precoVenda', filter.precos.precoVenda)
      .addOrderCondition('id', sort.id)
      .addOrderCondition('descricao', sort.descricao)
      .addOrderCondition('custo', sort.custo)
      .andPaginate(page, perPage)
      .build();

    const [rows, total] = await this.typeOrm.findAndCount({
      ...query,
    });

    return {
      rows,
      total,
    };
  }
}
