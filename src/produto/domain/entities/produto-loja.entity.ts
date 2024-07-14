import { Either, left, right } from '@shared/common/either/either';
import { ID } from '@shared/domain/value-objects/id.vo';

import { ProdutoLojaDTO } from '../dtos/produto.dto';
import { Moeda } from '../value-objects/moeda.vo';

type Props = {
  idProduto: ID;
  idLoja: ID;
  precoVenda: Moeda;
};

type EitherOutput = Either<string[], ProdutoLoja>;

export class ProdutoLoja {
  #idProduto: Readonly<ID>;
  #idLoja: Readonly<ID>;
  #precoVenda: Moeda;

  private constructor(props: Props) {
    this.#idProduto = Object.freeze(props.idProduto);
    this.#idLoja = Object.freeze(props.idLoja);
    this.#precoVenda = props.precoVenda;
  }

  static factory(props: ProdutoLojaDTO): EitherOutput {
    const attributeEitherList = {
      idProduto: ID.factory(props.idProduto),
      idLoja: ID.factory(props.idLoja),
      precoVenda: Moeda.factory(props.precoVenda ?? '0.000'),
    };

    const propsErrorList = Object.values(attributeEitherList)
      .filter((either) => either.isLeft())
      .map((either) => either.value as string);

    if (propsErrorList.length) {
      return left(propsErrorList);
    }

    return right(
      new ProdutoLoja({
        idProduto: attributeEitherList.idProduto.value as ID,
        idLoja: attributeEitherList.idLoja.value as ID,
        precoVenda: attributeEitherList.precoVenda.value as Moeda,
      })
    );
  }

  get idProduto(): Readonly<ID> {
    return this.#idProduto;
  }

  get idLoja(): Readonly<ID> {
    return this.#idLoja;
  }

  get precoVenda(): Moeda {
    return this.#precoVenda;
  }

  update(precoVenda: string): EitherOutput {
    return ProdutoLoja.factory({
      ...this.toJSON(),
      precoVenda: precoVenda,
    });
  }

  toJSON() {
    return {
      idProduto: this.idProduto.value,
      idLoja: this.idLoja.value,
      precoVenda: this.precoVenda.value,
    };
  }
}
