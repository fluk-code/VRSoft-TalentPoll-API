import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import LojaTypeOrm from './infra/data/typeorm/entities/loja-typeorm.entity';
import { LojaTypeOrmRepository } from './infra/data/typeorm/repositories/loja-typeorm.repository';
import { LOJA } from './loja.provider';
import { LojaController } from './presentation/loja.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LojaTypeOrm])],
  controllers: [LojaController],
  providers: [LojaTypeOrmRepository, ...Object.values(LOJA.APPLICATIONS)],
})
export class LojaModule {}
