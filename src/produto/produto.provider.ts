import { IFindableLojaById } from '../loja/domain/repositories/loja.repository.interface';
import { AddPrecoProdutoUseCase } from './application/use-cases/add-preco-produto.use-case';
import { CreateProdutoUseCase } from './application/use-cases/create-produto.use-case';
import { DeleteProdutoUseCase } from './application/use-cases/delete-produto.use-case';
import { FindProdutoByIdUseCase } from './application/use-cases/find-produto-by-id.use-case';
import { SearchProdutoUseCase } from './application/use-cases/search-produto.use-case';
import { UpdateProdutoUseCase } from './application/use-cases/update-produto.use-case';
import {
  IDeletableProduto,
  IFindableProdutoById,
  ISavableProduto,
  ISearchableProduto,
  IUpdatableProduto,
} from './domain/repositories/produto.repository.interface';
import { ProdutoTypeOrmRepository } from './infra/data/typeorm/repositories/produto-typeorm.repository';

/* eslint-disable @typescript-eslint/no-namespace */
export namespace PRODUTO {
  export namespace APPLICATIONS {
    export const CRATE_PRODUTO_USE_CASE = {
      provide: CreateProdutoUseCase,
      useFactory: (repository: ISavableProduto) => new CreateProdutoUseCase(repository),
      inject: [ProdutoTypeOrmRepository],
    };

    export const FIND_PRODUTO_BY__USE_CASE = {
      provide: FindProdutoByIdUseCase,
      useFactory: (repository: IFindableLojaById) => new FindProdutoByIdUseCase(repository),
      inject: [ProdutoTypeOrmRepository],
    };

    export const UPDATE_PRODUTO_USE_CASE = {
      provide: UpdateProdutoUseCase,
      useFactory: (repository: IUpdatableProduto & IFindableLojaById) =>
        new UpdateProdutoUseCase(repository),
      inject: [ProdutoTypeOrmRepository],
    };

    export const DELETE_PRODUTO_USE_CASE = {
      provide: DeleteProdutoUseCase,
      useFactory: (repository: IFindableProdutoById & IDeletableProduto) =>
        new DeleteProdutoUseCase(repository),
      inject: [ProdutoTypeOrmRepository],
    };

    export const SEARCH_PRODUTO_USE_CASE = {
      provide: SearchProdutoUseCase,
      useFactory: (repository: ISearchableProduto) => new SearchProdutoUseCase(repository),
      inject: [ProdutoTypeOrmRepository],
    };

    export const ADD_PRECO_PRODUTO_USE_CASE = {
      provide: AddPrecoProdutoUseCase,
      useFactory: (repository: ISavableProduto & IFindableLojaById) =>
        new AddPrecoProdutoUseCase(repository),
      inject: [ProdutoTypeOrmRepository],
    };
  }
}
