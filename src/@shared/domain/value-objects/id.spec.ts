/* eslint-disable sonarjs/no-duplicate-string */
import { ID } from './id.vo';

describe(`${ID.name}`, () => {
  describe(`${ID.factory.name}`, () => {
    it('Deve retornar um "Either Right" com a ID quando o valor inserido for valido', () => {
      const validValue = 1;
      const either = ID.factory(validValue);
      expect(either.isRight()).toBeTruthy();

      const vo = either.value as ID;
      expect(vo.value).toBe(validValue);
      expect(vo.toString()).toBe(validValue.toString());
    });

    it('Deve retornar "Either Left" com o motivo da rejeição quando valor inserido for diferente de number', () => {
      const arrangeInvalidValues = [true, false, 'string', ''];

      for (const invalidValues of arrangeInvalidValues) {
        const either = ID.factory(invalidValues as unknown as number);
        expect(either.isLeft()).toBeTruthy();
        expect(either.value).toBe('id deve ser um numero inteiro maior que 1');
      }
    });

    it('Deve retornar "Either Left" com o motivo da rejeição quando valor inserido for numero menor que 1', () => {
      const arrangeInvalidValues = [0, -1];

      for (const invalidValues of arrangeInvalidValues) {
        const either = ID.factory(invalidValues as unknown as number);
        expect(either.isLeft()).toBeTruthy();
        expect(either.value).toBe('id deve ser um numero inteiro maior que 1');
      }
    });

    it('Deve retornar "Either Left" com o motivo da rejeição quando valor inserido NÃO for um numero inteiro', () => {
      const arrangeInvalidValues = [1.5, 2.5];

      for (const invalidValues of arrangeInvalidValues) {
        const either = ID.factory(invalidValues as unknown as number);
        expect(either.isLeft()).toBeTruthy();
        expect(either.value).toBe('id deve ser um numero inteiro maior que 1');
      }
    });
  });
});
