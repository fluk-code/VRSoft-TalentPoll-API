import { SearchInputDTO, SortOptions } from '@shared/application/dtos/search-input.dto';
import { SearchOutputDTO } from '@shared/application/dtos/search-output.dto';

import { LojaDTO } from '../../domain/dtos/loja.dto';

export type FilterLojaDTO = {
  id?: number;
  descricao?: string;
};

export type SortLojaDTO = {
  id?: SortOptions;
  descricao?: SortOptions;
};

export class SearchInputLojaDTO extends SearchInputDTO<FilterLojaDTO, SortLojaDTO> {
  protected innerFilter: FilterLojaDTO = {
    id: undefined,
    descricao: undefined,
  };

  protected innerSort: SortLojaDTO = {
    id: 'ASC',
  };

  get filter(): FilterLojaDTO {
    return this.innerFilter;
  }

  set filter(value: string) {
    try {
      const { id, descricao } = JSON.parse(value);
      this.innerFilter = {
        id,
        descricao,
      };
    } catch {
      this.innerFilter = {
        id: undefined,
        descricao: undefined,
      };
    }
  }

  get sort(): SortLojaDTO {
    return this.innerSort;
  }

  set sort(value: string) {
    try {
      const { id, descricao } = JSON.parse(value);

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
    } catch {
      this.innerSort = {
        id: 'ASC',
      };
    }
  }
}

export class SearchLojaOutputDTO extends SearchOutputDTO<LojaDTO> {}
