import { SearchInputProdutoDTO } from '../../application/dtos/search-produto.dto';
import { ProdutoDTO } from '../dtos/produto.dto';
import { Produto } from '../entities/produto.entity';

export interface ISavableProduto {
  save(descricao: Omit<ProdutoDTO, 'id'>): Promise<ProdutoDTO>;
}

export interface IFindableProdutoById {
  findById(id: number): Promise<ProdutoDTO | null>;
}

export interface IUpdatableProduto {
  update(Produto: Produto): Promise<void>;
}

export interface IDeletableProduto {
  delete(id: number): Promise<void>;
}

export interface ISearchableProduto {
  search(dot: SearchInputProdutoDTO): Promise<{
    rows: ProdutoDTO[];
    total: number;
  }>;
}
