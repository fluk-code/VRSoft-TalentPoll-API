import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ProdutoDTO, ProdutoLojaDTO } from '../../../../domain/dtos/produto.dto';
import ProdutoLojaTypeOrm from './produto-loja-typeorm.entity';

@Entity({ name: 'produtos' })
export default class ProdutoTypeOrm extends ProdutoDTO {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  descricao!: string;

  @Column()
  custo?: string;

  @Column()
  imagem?: string;

  @OneToMany(() => ProdutoLojaTypeOrm, (produtoLoja) => produtoLoja.produto, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  precos!: ProdutoLojaDTO[];
}
