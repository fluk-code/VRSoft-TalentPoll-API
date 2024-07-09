import { isString, maxLength } from 'class-validator';

import { Either, left, right } from '@shared/common/either/either';

type EitherOutput = Either<string, Descricao>;

export class Descricao {
  #value: Readonly<string>;

  private constructor(value: string) {
    this.#value = Object.freeze(value);
  }

  static factory(value: string): EitherOutput {
    console.log(maxLength(value, 60));

    const isValid = isString(value) && maxLength(value, 60);

    if (!isValid) {
      return left('descricao deve ser uma string com no máximo 60 caracteres');
    }

    return right(new Descricao(value));
  }

  get value(): string {
    return this.#value;
  }
}
