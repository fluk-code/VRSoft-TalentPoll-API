import { isNumber } from 'class-validator';

export type SortOptions = 'ASC' | 'DESC';

export abstract class SearchInputDTO<Filter, Sort> {
  protected innerFilter!: Filter;
  protected innerSort!: Sort;
  #perPage!: number;
  #page!: number;

  constructor() {
    this.page = 1;
    this.#perPage = 50;
  }

  abstract get filter(): Filter;

  abstract set filter(value: string);

  abstract get sort(): Sort;

  abstract set sort(value: string);

  get perPage(): number {
    return this.#perPage;
  }

  set perPage(value: number) {
    const number = Number(value);
    if (isNumber(number)) {
      this.#perPage = Number(number);
    }
  }

  get page(): number {
    return this.#page;
  }

  set page(value: number) {
    const number = Number(value);
    if (isNumber(number)) {
      this.#page = Number(number);
    }
  }
}
