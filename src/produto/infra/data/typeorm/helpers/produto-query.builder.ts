import { QueryBuilder } from '@shared/infra/typeorm/helpers/query.builder';

import { FilterProdutoDTO, SortProdutoDTO } from '../../../../application/dtos/search-produto.dto';

export class ProdutoQueryBuilder extends QueryBuilder<FilterProdutoDTO, SortProdutoDTO> {}
