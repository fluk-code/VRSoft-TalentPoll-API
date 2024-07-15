import { Moeda } from './moeda.vo';

describe(Moeda.name, () => {
  describe(Moeda.factory.name, () => {
    it('Deve retornar um "Either Right" com a Moeda quando o valor inserido for valido', () => {
      const arrageValidValue = ['0', '1', '1.1', '10.12', '100.123'];

      for (const validValue of arrageValidValue) {
        const either = Moeda.factory(validValue);
        expect(either.isRight()).toBeTruthy();

        const vo = either.value as Moeda;
        expect(vo.value).toBe(validValue);
        expect(vo.toString()).toBe(validValue.toString());
      }
    });

    it('Deve retornar "Either Left" com o motivo da rejeição quando valor inserido for diferente de numero string', () => {
      const arrangeInvalidValues = [true, false, 'some string'];

      for (const invalidValues of arrangeInvalidValues) {
        const either = Moeda.factory(invalidValues as unknown as string);

        expect(either.isLeft()).toBeTruthy();
        expect(either.value).toBe('moeda deve ser um numero com no máximo 3 casa decimais');
      }
    });

    it('Deve retornar "Either Left" com o motivo da rejeição quando valor inserido conter mais de 3 casas decimais', () => {
      const arrangeInvalidValues = ['2.1234', '5.12345', '10.111111111'];

      for (const invalidValues of arrangeInvalidValues) {
        const either = Moeda.factory(invalidValues as unknown as string);

        expect(either.isLeft()).toBeTruthy();
        expect(either.value).toBe('moeda deve ser um numero com no máximo 3 casa decimais');
      }
    });

    it('Deve retornar value no formato de numero quando toNumber for chamado', () => {
      const vo = Moeda.factory('1.123').value as Moeda;

      expect(vo.toNumber()).toBe(1.123);
    });
  });
});
