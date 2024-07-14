import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ProdutoLojaDTO } from '../../../../../produto/domain/dtos/produto.dto';
import ProdutoLojaTypeOrm from '../../../../../produto/infra/data/typeorm/entities/produto-loja-typeorm.entity';
import { LojaDTO } from '../../../../domain/dtos/loja.dto';

@Entity({ name: 'lojas' })
export default class LojaTypeOrm extends LojaDTO {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  descricao!: string;

  @OneToMany(() => ProdutoLojaTypeOrm, (produtoLoja) => produtoLoja.loja)
  precos!: ProdutoLojaDTO[];
}
