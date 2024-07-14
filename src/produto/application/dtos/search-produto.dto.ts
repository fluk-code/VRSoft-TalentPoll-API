import { SearchInputDTO, SortOptions } from '@shared/application/dtos/search-input.dto';
import { SearchOutputDTO } from '@shared/application/dtos/search-output.dto';

import { ProdutoDTO } from '../../domain/dtos/produto.dto';

export type FilterProdutoDTO = {
  id?: number;
  descricao?: string;
  custo?: string;
  precos?: { precoVenda?: string };
};

export type SortProdutoDTO = {
  id?: SortOptions;
  descricao?: SortOptions;
  custo?: SortOptions;
};

export class SearchInputProdutoDTO extends SearchInputDTO<FilterProdutoDTO, SortProdutoDTO> {
  protected innerFilter: FilterProdutoDTO = {
    id: undefined,
    descricao: undefined,
    custo: undefined,
    precos: {
      precoVenda: undefined,
    },
  };

  protected innerSort: SortProdutoDTO = {
    id: 'ASC',
  };

  get filter(): FilterProdutoDTO {
    return this.innerFilter;
  }

  set filter(value: string) {
    try {
      const { id, descricao, custo, precos } = JSON.parse(value);
      this.innerFilter = {
        id,
        descricao,
        custo,
        precos,
      };
    } catch {
      this.innerFilter = {
        id: undefined,
        descricao: undefined,
        custo: undefined,
        precos: {
          precoVenda: undefined,
        },
      };
    }
  }

  get sort(): SortProdutoDTO {
    return this.innerSort;
  }

  set sort(value: string) {
    try {
      const { id, descricao, custo } = JSON.parse(value);

      if (id) {
        this.innerSort = {
          id,
        };
      }

      if (descricao) {
        this.innerSort = {
          descricao,
        };
      }

      if (custo) {
        this.innerSort = {
          custo,
        };
      }
    } catch {
      this.innerSort = {
        id: 'ASC',
      };
    }
  }
}

export class SearchProdutoOutputDTO extends SearchOutputDTO<ProdutoDTO> {}
