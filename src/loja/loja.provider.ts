/* eslint-disable @typescript-eslint/no-namespace */

import { CreateLojaUseCase } from './applications/use-cases/create-loja.use-case';
import { ISavableLoja } from './domain/repositories/loja.repository.interface';
import { LojaTypeOrmRepository } from './infra/data/typeorm/repositories/loja-typeorm.repository';

export namespace LOJA {
  export namespace APPLICATIONS {
    export const CRATE_LOJA_USE_CASE = {
      provide: CreateLojaUseCase,
      useFactory: (repository: ISavableLoja) => new CreateLojaUseCase(repository),
      inject: [LojaTypeOrmRepository],
    };
  }
}
