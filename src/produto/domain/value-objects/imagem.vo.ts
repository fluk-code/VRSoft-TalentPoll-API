import { Either, right } from '@shared/common/either/either';

type EitherOutput = Either<string, Imagem>;

export class Imagem {
  #value: Readonly<string>;

  private constructor(value: string) {
    this.#value = Object.freeze(value);
  }

  static factory(value: string): EitherOutput {
    return right(new Imagem(value));
  }

  get value(): string {
    return this.#value;
  }

  toString(): string {
    return this.value;
  }
}
