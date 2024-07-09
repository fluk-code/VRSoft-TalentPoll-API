import { isInt, isNumber, min } from 'class-validator';

import { Either, left, right } from '@shared/common/either/either';

type EitherOutput = Either<string, ID>;

export class ID {
  #value: Readonly<number>;

  private constructor(value: number) {
    this.#value = Object.freeze(value);
  }

  static factory(value: number): EitherOutput {
    const isValid = isNumber(value) && isInt(value) && min(value, 1);

    if (!isValid) {
      return left('id deve ser um numero inteiro maior que 1');
    }

    return right(new ID(value));
  }

  get value(): number {
    return this.#value;
  }

  toString(): string {
    return this.value.toString();
  }
}
