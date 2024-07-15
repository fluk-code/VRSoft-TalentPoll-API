/* eslint-disable sonarjs/no-duplicate-string */
import { Loja } from './loja.entity';

describe(Loja.name, () => {
  describe(Loja.factory.name, () => {
    it('Deve retornar um "Either Right" com a Loja quando o valor inserido for valido', () => {
      const validValue = {
        id: 1,
        descricao: 'Some description',
      };
      const either = Loja.factory(validValue);
      expect(either.isRight()).toBeTruthy();

      const vo = either.value as Loja;
      expect(vo.toJSON()).toStrictEqual(validValue);
    });

    it('Deve retornar "Either Left" com lista de motivos quando o id for invalido', () => {
      const either = Loja.factory({
        id: undefined as unknown as number,
        descricao: 'Some description',
      });

      expect(either.isLeft()).toBeTruthy();
      expect(either.value).toStrictEqual(['id deve ser um numero inteiro maior que 1']);
    });

    it('Deve retornar "Either Left" com lista de motivos quando a descrição for invalida', () => {
      const either = Loja.factory({
        id: 1,
        descricao: undefined as unknown as string,
      });

      expect(either.isLeft()).toBeTruthy();
      expect(either.value).toStrictEqual([
        'descricao deve ser uma string com no máximo 60 caracteres',
      ]);
    });

    it('Deve retornar "Either Left" com lista de motivos quando a todos campos forem invalidos', () => {
      const either = Loja.factory({
        id: undefined as unknown as number,
        descricao: undefined as unknown as string,
      });

      expect(either.isLeft()).toBeTruthy();
      expect(either.value).toStrictEqual([
        'id deve ser um numero inteiro maior que 1',
        'descricao deve ser uma string com no máximo 60 caracteres',
      ]);
    });
  });

  describe(Loja.prototype.update.name, () => {
    let lojaStub: Loja;

    beforeEach(() => {
      lojaStub = Loja.factory({
        id: 1,
        descricao: 'Some description',
      }).value as Loja;
    });

    it('Deve retornar "Either Right" quando a descricao for valida', () => {
      const descricao = 'New decription';

      const output = lojaStub.update(descricao);

      expect(output.isRight()).toBeTruthy();

      const entity = output.value as Loja;
      expect(entity.toJSON()).toStrictEqual({
        id: 1,
        descricao,
      });
    });

    it('Deve retornar "Either Left" quando a descricao for invalida', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const output = lojaStub.update(1 as any);

      expect(output.isLeft()).toBeTruthy();

      expect(output.value).toStrictEqual([
        'descricao deve ser uma string com no máximo 60 caracteres',
      ]);
    });
  });
});
