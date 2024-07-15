import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ProdutoLojaTypeOrm from './infra/data/typeorm/entities/produto-loja-typeorm.entity';
import ProdutoTypeOrm from './infra/data/typeorm/entities/produto-typeorm.entity';
import { ProdutoQueryBuilder } from './infra/data/typeorm/helpers/produto-query.builder';
import { ProdutoTypeOrmRepository } from './infra/data/typeorm/repositories/produto-typeorm.repository';
import { ProdutoController } from './presentation/produto.controller';
import { PRODUTO } from './produto.provider';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoTypeOrm, ProdutoLojaTypeOrm])],
  controllers: [ProdutoController],
  providers: [
    ProdutoTypeOrmRepository,
    ProdutoQueryBuilder,
    ...Object.values(PRODUTO.APPLICATIONS),
  ],
})
export class ProdutoModule {}
