type ContructorProps<Data> = {
  data: Data[];
  page: number;
  total: number;
  perPage: number;
};

export abstract class SearchOutputDTO<Data> {
  #data: Data[];
  #page: number;
  #total: number;
  #lastPage!: number;

  constructor(props: ContructorProps<Data>) {
    this.#page = props.page;
    this.#data = props.data;
    this.#total = props.total;
    this.setLastPage(props.total, props.perPage);
  }

  get data(): Data[] {
    return this.#data;
  }

  get page(): number {
    return this.#page;
  }

  get total(): number {
    return this.#total;
  }

  get lastPage(): number {
    return this.#lastPage;
  }

  private setLastPage(total: number, perPage: number) {
    this.#lastPage = Math.ceil(total / perPage);
  }

  toJSON() {
    return {
      data: this.data,
      page: this.page,
      total: this.total,
      lastPage: this.lastPage,
    };
  }
}
