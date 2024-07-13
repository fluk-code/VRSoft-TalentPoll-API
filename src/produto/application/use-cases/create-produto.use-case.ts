import {
  BadRequestException,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { IUseCase } from '@shared/application/use-case.interface';
import { Descricao } from '@shared/domain/value-objects/descricao.vo';

import { Produto } from '../../domain/entities/produto.entity';
import { ISavableProduto } from '../../domain/repositories/produto.repository.interface';
import { Imagem } from '../../domain/value-objects/imagem.vo';
import { Moeda } from '../../domain/value-objects/moeda.vo';
import { CreateProdutoDTO } from '../dtos/create-produto.dto';

export class CreateProdutoUseCase implements IUseCase<CreateProdutoDTO, Produto> {
  constructor(private readonly repository: ISavableProduto) {}

  async execute(input: CreateProdutoDTO): Promise<Produto> {
    const descricaoEither = Descricao.factory(input.descricao);
    const custoEither = Moeda.factory(input.custo ?? '0.000');
    const imagemEither = Imagem.factory(input.imagem ?? '');

    if (descricaoEither.isLeft() || custoEither.isLeft() || imagemEither.isLeft()) {
      throw new BadRequestException(descricaoEither.value);
    }

    const descricaoVo = descricaoEither.value;
    const custoVo = custoEither.value;
    const imagemVo = imagemEither.value;

    const produtoProps = await this.repository
      .save({
        descricao: descricaoVo.value,
        custo: custoVo.value,
        imagem: imagemVo.value,
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });

    const produtoEither = Produto.factory(produtoProps);

    if (produtoEither.isLeft()) {
      throw new UnprocessableEntityException(produtoEither.value);
    }

    return produtoEither.value;
  }
}
