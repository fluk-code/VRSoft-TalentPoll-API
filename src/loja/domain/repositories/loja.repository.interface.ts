import { LojaDTO } from '../dtos/loja.dto';
import { Loja } from '../entities/loja.entity';

export interface ISavableLoja {
  save(descricao: Omit<LojaDTO, 'id'>): Promise<LojaDTO>;
}

export interface IFindableLojaById {
  findById(id: number): Promise<LojaDTO | null>;
}

export interface IUpdatableLoja {
  update(loja: Loja): Promise<void>;
}
