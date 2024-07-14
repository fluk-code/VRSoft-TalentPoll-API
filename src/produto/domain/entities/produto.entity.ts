import { Either, left, right } from '@shared/common/either/either';
import { Descricao } from '@shared/domain/value-objects/descricao.vo';
import { ID } from '@shared/domain/value-objects/id.vo';

import { ProdutoDTO } from '../dtos/produto.dto';
import { Imagem } from '../value-objects/imagem.vo';
import { Moeda } from '../value-objects/moeda.vo';
import { ProdutoLoja } from './produto-loja.entity';

type Props = {
  id: ID;
  descricao: Descricao;
  custo: Moeda;
  imagem: Imagem;
  precos: ProdutoLoja[];
};

type EitherOutput = Either<string[], Produto>;

export class Produto {
  #id: Readonly<ID>;
  #descricao: Descricao;
  #custo: Moeda;
  #imagem: Imagem;
  #precos: ProdutoLoja[];

  private constructor(props: Props) {
    this.#id = Object.freeze(props.id);
    this.#descricao = props.descricao;
    this.#custo = props.custo;
    this.#imagem = props.imagem;
    this.#precos = props.precos;
  }

  static factory(props: ProdutoDTO): EitherOutput {
    const attributeEitherList = {
      id: ID.factory(props.id),
      descricao: Descricao.factory(props.descricao),
      custo: Moeda.factory(props.custo ?? '0.000'),
      imagem: Imagem.factory(props.imagem ?? ''),
      precos: props.precos?.map((produtoLojaProps) => ProdutoLoja.factory(produtoLojaProps)) ?? [],
    };

    const propsErrorList = Object.values(attributeEitherList)
      .flat()
      .filter((either) => either.isLeft())
      .map((either) => either.value as string);

    if (propsErrorList.length) {
      return left(propsErrorList);
    }

    return right(
      new Produto({
        id: attributeEitherList.id.value as ID,
        descricao: attributeEitherList.descricao.value as Descricao,
        custo: attributeEitherList.custo.value as Moeda,
        imagem: attributeEitherList.imagem.value as Imagem,
        precos: attributeEitherList.precos.map((either) => either.value as ProdutoLoja),
      })
    );
  }

  get id(): Readonly<ID> {
    return this.#id;
  }

  get descicao(): Descricao {
    return this.#descricao;
  }

  get custo(): Moeda {
    return this.#custo;
  }

  get imagem(): Imagem {
    return this.#imagem;
  }

  get precos(): ProdutoLoja[] {
    return this.#precos;
  }

  addPreco(idLoja: number, precoVenda: string): EitherOutput {
    const produtoLojaEither = ProdutoLoja.factory({
      idLoja,
      idProduto: this.id.value,
      precoVenda,
    });

    if (produtoLojaEither.isLeft()) {
      return left(produtoLojaEither.value);
    }

    this.#precos.push(produtoLojaEither.value);

    return right(this);
  }

  removePreco(idLoja: number): EitherOutput {
    const idLojaEither = ID.factory(idLoja);

    if (idLojaEither.isLeft()) {
      return left([idLojaEither.value]);
    }

    const produtoLojaIndex = this.#precos.findIndex((entity) => entity.idLoja.value === idLoja);

    produtoLojaIndex !== -1 && this.#precos.slice(produtoLojaIndex, 1);

    return right(this);
  }

  update(props: Omit<ProdutoDTO, 'id'>): EitherOutput {
    return Produto.factory({
      ...this.toJSON(),
      descricao: props.descricao,
      custo: props.custo,
      imagem: props.imagem,
    });
  }

  toJSON() {
    return {
      id: this.id.value,
      descricao: this.descicao.value,
      custo: this.custo.value,
      imagem: this.imagem.value,
      precos: this.precos.map((produtoLojaEntity) => produtoLojaEntity.toJSON()),
    };
  }
}
