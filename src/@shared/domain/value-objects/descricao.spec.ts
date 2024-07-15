import { Descricao } from './descricao.vo';

describe(Descricao.name, () => {
  describe(Descricao.factory.name, () => {
    it('Deve retornar um "Either Right" com a Descricao quando o valor inserido for valido', () => {
      const validValue = 'Qualquer valor valido';
      const either = Descricao.factory(validValue);
      expect(either.isRight()).toBeTruthy();

      const vo = either.value as Descricao;
      expect(vo.value).toBe(validValue);
      expect(vo.toString()).toBe(validValue.toString());
    });

    it('Deve retornar "Either Left" com o motivo da rejeição quando valor inserido for diferente de string', () => {
      const arrangeInvalidValues = [true, false, 0, 1];

      for (const invalidValues of arrangeInvalidValues) {
        const either = Descricao.factory(invalidValues as unknown as string);
        expect(either.isLeft()).toBeTruthy();
        expect(either.value).toBe('descricao deve ser uma string com no máximo 60 caracteres');
      }
    });

    it('Deve retornar "Either Left" com o motivo da rejeição quando valor inserido for string maior que 60 caracteres', () => {
      const invalidValue = '1234567890123456789012345678901234567890123456789012345678901';
      const either = Descricao.factory(invalidValue as unknown as string);
      expect(either.isLeft()).toBeTruthy();
      expect(either.value).toBe('descricao deve ser uma string com no máximo 60 caracteres');
    });
  });
});
