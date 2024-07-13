import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ProdutoDTO } from '../../../../domain/dtos/produto.dto';

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
}
