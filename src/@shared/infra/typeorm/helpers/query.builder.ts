import { FindOperator } from 'typeorm';

import { Injectable, Scope } from '@nestjs/common';

import { SortOptions } from '@shared/application/dtos/search-input.dto';

@Injectable({
  scope: Scope.REQUEST,
})
export class QueryBuilder<FilterDTO, SortDTO> {
  #where = {};
  #order = {};
  #skip!: number;
  #take!: number;

  addWhereCondition(field: keyof FilterDTO, condition: FindOperator<unknown> | unknown) {
    if (condition) {
      this.#where = { ...this.#where, [field]: condition };
    }
    return this;
  }

  andWhereRelationCondition(
    relation: keyof FilterDTO,
    field: string,
    condition: FindOperator<unknown> | unknown
  ) {
    if (condition) {
      const where = this.#where as FilterDTO;
      let relationCondition = {};
      if (where[relation]) {
        relationCondition = { ...where[relation], [field]: condition };
      } else {
        relationCondition = { [field]: condition };
      }

      this.#where = {
        ...this.#where,
        [relation]: {
          ...relationCondition,
        },
      };
    }
    return this;
  }

  addOrderCondition(field: keyof SortDTO, direction?: SortOptions) {
    if (direction) {
      this.#order = { ...this.#order, [field]: direction };
    }
    return this;
  }

  andPaginate(page: number, perPage: number) {
    this.#skip = (page - 1) * perPage;
    this.#take = perPage;
    return this;
  }

  build() {
    return {
      where: this.#where,
      order: this.#order,
      skip: this.#skip,
      take: this.#take,
    };
  }
}
