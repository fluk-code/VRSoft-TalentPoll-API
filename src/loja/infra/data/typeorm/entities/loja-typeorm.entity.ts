import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { LojaDTO } from '../../../../domain/dtos/loja.dto';

@Entity({ name: 'lojas' })
export default class LojaTypeorm extends LojaDTO {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  descricao!: string;
}
