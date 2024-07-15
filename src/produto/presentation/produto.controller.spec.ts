/* eslint-disable sonarjs/no-duplicate-string */
import { IUseCase } from '@shared/application/use-case.interface';

import { CreateProdutoDTO } from '../application/dtos/create-produto.dto';
import {
  SearchInputProdutoDTO,
  SearchProdutoOutputDTO,
} from '../application/dtos/search-produto.dto';
import { InputProps as InputAddPrecoProps } from '../application/use-cases/add-preco-produto.use-case';
import { InputProps as InputRemovePrecoProps } from '../application/use-cases/remove-preco-produto.use-case';
import { InputProps as InputUpdateProps } from '../application/use-cases/update-produto.use-case';
import { Produto } from '../domain/entities/produto.entity';
import { ProdutoController } from './produto.controller';

describe(ProdutoController.name, () => {
  let controller: ProdutoController;
  let createUseCase: jest.Mocked<IUseCase<CreateProdutoDTO, Produto>>;
  let fndByIDUseCase: jest.Mocked<IUseCase<number, Produto>>;
  let updateUseCase: jest.Mocked<IUseCase<InputUpdateProps, Produto>>;
  let deleteUseCase: jest.Mocked<IUseCase<number, void>>;
  let searchUseCase: jest.Mocked<IUseCase<SearchInputProdutoDTO, SearchProdutoOutputDTO>>;
  let addPrecoUseCase: jest.Mocked<IUseCase<InputAddPrecoProps, Produto>>;
  let removePrecoUseCase: jest.Mocked<IUseCase<InputRemovePrecoProps, Produto>>;

  beforeEach(async () => {
    createUseCase = {
      execute: jest.fn(),
    };

    fndByIDUseCase = {
      execute: jest.fn(),
    };

    updateUseCase = {
      execute: jest.fn(),
    };

    deleteUseCase = {
      execute: jest.fn(),
    };

    searchUseCase = {
      execute: jest.fn(),
    };

    addPrecoUseCase = {
      execute: jest.fn(),
    };

    removePrecoUseCase = {
      execute: jest.fn(),
    };

    controller = new ProdutoController(
      createUseCase,
      fndByIDUseCase,
      updateUseCase,
      deleteUseCase,
      searchUseCase,
      addPrecoUseCase,
      removePrecoUseCase
    );
  });

  describe(ProdutoController.prototype.create.name, () => {
    it('Deve retornar produto quando a chamada for bem sucedida', async () => {
      const produtoStub = {
        id: 1,
        descricao: 'Some description',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
      createUseCase.execute.mockResolvedValueOnce(produtoStub);

      const output = await controller.create({ descricao: 'Some description' });
      expect(output).toStrictEqual(produtoStub);
    });

    it('Deve falhar quando o use case falhar', () => {
      const errorStub = new Error('Some message error');
      createUseCase.execute.mockRejectedValueOnce(errorStub);

      const promiseOutput = controller.create({
        descricao: 'Some descricao',
      });

      expect(promiseOutput).rejects.toThrow(errorStub);
    });
  });

  describe(ProdutoController.prototype.update.name, () => {
    it('Deve retornar produto quando a chamada for bem sucedida', async () => {
      const produtoStub = {
        id: 1,
        descricao: 'New description',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
      updateUseCase.execute.mockResolvedValueOnce(produtoStub);

      const output = await controller.update(1, { descricao: 'New description', custo: '10.000' });
      expect(output).toStrictEqual(produtoStub);
    });

    it('Deve falhar quando o use case falhar', () => {
      const errorStub = new Error('Some message error');
      updateUseCase.execute.mockRejectedValueOnce(errorStub);

      const promiseOutput = controller.update(1, {
        descricao: 'New descricao',
        custo: '10.000',
      });

      expect(promiseOutput).rejects.toThrow(errorStub);
    });
  });

  describe(ProdutoController.prototype.addPreco.name, () => {
    it('Deve retornar produto quando a chamada for bem sucedida', async () => {
      const produtoStub = {
        id: 1,
        descricao: 'Some description',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
      addPrecoUseCase.execute.mockResolvedValueOnce(produtoStub);

      const output = await controller.addPreco(1, { idLoja: 7, precoVenda: '10.000' });
      expect(output).toStrictEqual(produtoStub);
    });

    it('Deve falhar quando o use case falhar', () => {
      const errorStub = new Error('Some message error');
      addPrecoUseCase.execute.mockRejectedValueOnce(errorStub);

      const promiseOutput = controller.addPreco(1, { idLoja: 7, precoVenda: '10.000' });
      expect(promiseOutput).rejects.toThrow(errorStub);
    });
  });

  describe(ProdutoController.prototype.removePreco.name, () => {
    it('Deve retornar produto quando a chamada for bem sucedida', async () => {
      const produtoStub = {
        id: 1,
        descricao: 'Some description',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
      removePrecoUseCase.execute.mockResolvedValueOnce(produtoStub);

      const output = await controller.removePreco(1, 7);
      expect(output).toStrictEqual(produtoStub);
    });

    it('Deve falhar quando o use case falhar', () => {
      const errorStub = new Error('Some message error');
      removePrecoUseCase.execute.mockRejectedValueOnce(errorStub);

      const promiseOutput = controller.removePreco(1, 7);
      expect(promiseOutput).rejects.toThrow(errorStub);
    });
  });

  describe(ProdutoController.prototype.delete.name, () => {
    it('Deve retornar produto quando a chamada for bem sucedida', async () => {
      deleteUseCase.execute.mockResolvedValueOnce();

      const output = await controller.delete(1);
      expect(output).toBeUndefined();
    });

    it('Deve falhar quando o use case falhar', () => {
      const errorStub = new Error('Some message error');
      deleteUseCase.execute.mockRejectedValueOnce(errorStub);

      const promiseOutput = controller.delete(1);
      expect(promiseOutput).rejects.toThrow(errorStub);
    });
  });

  describe(ProdutoController.prototype.findByID.name, () => {
    it('Deve retornar produto quando a chamada for bem sucedida', async () => {
      fndByIDUseCase.execute.mockResolvedValueOnce({
        id: 1,
        descicao: 'Some Descricao',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

      const output = await controller.findByID(1);
      expect(output).toStrictEqual({ id: 1, descicao: 'Some Descricao' });
    });

    it('Deve falhar quando o use case falhar', () => {
      const errorStub = new Error('Some message error');
      fndByIDUseCase.execute.mockRejectedValueOnce(errorStub);

      const promiseOutput = controller.findByID(1);
      expect(promiseOutput).rejects.toThrow(errorStub);
    });
  });

  describe(ProdutoController.prototype.search.name, () => {
    it('Deve retornar SearchprodutoOutputDTO quando a chamada for bem sucedida', async () => {
      const searchInputFake = new SearchInputProdutoDTO();
      const searchOutputFake = {
        data: [],
        page: searchInputFake.page,
        perPage: searchInputFake.perPage,
        total: 10,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
      searchUseCase.execute.mockResolvedValueOnce(searchOutputFake);

      const output = await controller.search(searchInputFake);
      expect(output).toStrictEqual(searchOutputFake);
    });

    it('Deve falhar quando o use case falhar', () => {
      const errorStub = new Error('Some message error');
      searchUseCase.execute.mockRejectedValueOnce(errorStub);

      const searchInputFake = new SearchInputProdutoDTO();
      const promiseOutput = controller.search(searchInputFake);
      expect(promiseOutput).rejects.toThrow(errorStub);
    });
  });
});
