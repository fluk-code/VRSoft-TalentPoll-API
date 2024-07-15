import { isEmpty } from 'class-validator';

import { Either, left, right } from '@shared/common/either/either';

type EitherOutput = Either<string, Imagem>;

export class Imagem {
  #value: Readonly<string>;

  private constructor(value: string) {
    this.#value = Object.freeze(value);
  }

  static factory(value: string | Buffer): EitherOutput {
    if (Buffer.isBuffer(value)) {
      const valueString = Buffer.from(value).toString();
      return right(new Imagem(valueString));
    }

    const pngRegex = /^data:image\/png;base64,/;
    const jpegRegex = /^data:image\/jpeg;base64,/;
    const jpgRegex = /^data:image\/jpg;base64,/;

    const isValid =
      isEmpty(value) || pngRegex.test(value) || jpegRegex.test(value) || jpgRegex.test(value);

    if (!isValid) {
      return left('imagem deve ser do tipo jpeg ou png');
    }

    return right(new Imagem(value));
  }

  get value(): string {
    return this.#value;
  }

  toString(): string {
    return this.value;
  }
}
