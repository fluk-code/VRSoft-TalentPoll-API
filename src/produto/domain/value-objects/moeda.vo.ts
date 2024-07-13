import { isNumberString } from 'class-validator';

import { Either, left, right } from '@shared/common/either/either';

type EitherOutput = Either<string, Moeda>;

export class Moeda {
  #value: Readonly<string>;

  private constructor(value: string) {
    this.#value = Object.freeze(value);
  }

  static factory(value: string): EitherOutput {
    const decimalRegex = /^\d+(\.\d{1,3})?$/;
    const isValid = isNumberString(value) && decimalRegex.test(value);

    if (!isValid) {
      return left('moeda deve ser um numero com no máximo 3 casa decimais');
    }

    return right(new Moeda(value));
  }

  get value(): string {
    return this.#value;
  }

  toString(): string {
    return this.value;
  }

  toNumber(): number {
    return Number(this.value);
  }
}
