import { QueryBuilder } from '@shared/infra/typeorm/helpers/query.builder';

import { FilterLojaDTO, SortLojaDTO } from '../../../../applications/dtos/search-loja.dto';

export class LojaQueryBuilder extends QueryBuilder<FilterLojaDTO, SortLojaDTO> {}
