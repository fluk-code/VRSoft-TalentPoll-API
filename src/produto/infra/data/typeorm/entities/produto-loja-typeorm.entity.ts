import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import LojaTypeOrm from '../../../../../loja/infra/data/typeorm/entities/loja-typeorm.entity';
import { ProdutoLojaDTO } from '../../../../domain/dtos/produto.dto';
import ProdutoTypeOrm from './produto-typeorm.entity';

@Entity({ name: 'produtos_lojas' })
export default class ProdutoLojaTypeOrm extends ProdutoLojaDTO {
  @PrimaryColumn({ name: 'id_produto' })
  idProduto!: number;

  @PrimaryColumn({ name: 'id_loja' })
  idLoja!: number;

  @Column({ name: 'preco_venda' })
  precoVenda?: string;

  @ManyToOne(() => ProdutoTypeOrm, (produto) => produto.precos)
  @JoinColumn({ name: 'id_produto' })
  produto!: ProdutoTypeOrm;

  @ManyToOne(() => LojaTypeOrm, (produto) => produto.precos)
  @JoinColumn({ name: 'id_loja' })
  loja!: ProdutoTypeOrm;
}
