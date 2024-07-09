import { Either, left, right } from '@shared/common/either/either';
import { Descricao } from '@shared/domain/value-objects/descricao.vo';
import { ID } from '@shared/domain/value-objects/id.vo';

import { LojaDTO } from '../dtos/loja.dto';

type Props = {
  id: ID;
  descricao: Descricao;
};

type EitherOutput = Either<string[], Loja>;

export class Loja {
  #id: Readonly<ID>;
  #descricao: Descricao;

  private constructor(props: Props) {
    this.#id = Object.freeze(props.id);
    this.#descricao = props.descricao;
  }

  static factory(props: LojaDTO): EitherOutput {
    const attributeEitherList = {
      id: ID.factory(props.id),
      descricao: Descricao.factory(props.descricao),
    };

    const propsErrorList = Object.values(attributeEitherList)
      .filter((either) => either.isLeft())
      .map((either) => either.value as string);

    if (propsErrorList.length) {
      return left(propsErrorList);
    }

    return right(
      new Loja({
        id: attributeEitherList.id.value as ID,
        descricao: attributeEitherList.descricao.value as Descricao,
      })
    );
  }

  get id(): Readonly<ID> {
    return this.#id;
  }

  get descicao(): Descricao {
    return this.#descricao;
  }

  toJSON() {
    return {
      id: this.id.value,
      descricao: this.descicao.value,
    };
  }
}
