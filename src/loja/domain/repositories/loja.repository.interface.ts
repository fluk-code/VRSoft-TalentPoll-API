import { LojaDTO } from '../dtos/loja.dto';

export interface ISavableLoja {
  save(descricao: Omit<LojaDTO, 'id'>): Promise<LojaDTO>;
}
