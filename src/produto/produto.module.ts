import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ProdutoTypeOrm from './infra/data/typeorm/entities/produto-typeorm.entity';
import { ProdutoQueryBuilder } from './infra/data/typeorm/helpers/produto-query.builder';
import { ProdutoTypeOrmRepository } from './infra/data/typeorm/repositories/produto-typeorm.repository';
import { ProdutoController } from './presentatio/produto.controller';
import { PRODUTO } from './produto.provider';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoTypeOrm])],
  controllers: [ProdutoController],
  providers: [
    ProdutoTypeOrmRepository,
    ProdutoQueryBuilder,
    ...Object.values(PRODUTO.APPLICATIONS),
  ],
})
export class ProdutoModule {}
