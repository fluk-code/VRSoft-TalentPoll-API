import { Imagem } from './imagem.vo';

describe(Imagem.name, () => {
  describe(Imagem.factory.name, () => {
    it('Deve retornar um "Either Right" com a Imagem quando o valor inserido for valido', () => {
      const arrageValidValue = [
        'data:image/png;base64,SOME HASH',
        'data:image/jpeg;base64,SOME HASH',
        'data:image/jpg;base64,SOME HASH',
      ];

      for (const validValue of arrageValidValue) {
        const either = Imagem.factory(validValue);
        expect(either.isRight()).toBeTruthy();

        const vo = either.value as Imagem;
        expect(vo.value).toBe(validValue);
        expect(vo.toString()).toBe(validValue.toString());
      }
    });

    it('Deve retornar um "Either Right" com a Imagem quando o valor inserido for um Buffer', () => {
      const bufferFake = Buffer.from('data:image/png;base64,SOME HASH');

      const either = Imagem.factory(bufferFake);
      expect(either.isRight()).toBeTruthy();

      const vo = either.value as Imagem;
      expect(vo.value).toBe(Buffer.from(bufferFake).toString());
      expect(vo.toString()).toBe(Buffer.from(bufferFake).toString());
    });

    it('Deve retornar "Either Left" com o motivo da rejeição quando valor inserido for NÃO for um formato valido', () => {
      const arrangeInvalidValues = ['some string', 'data:image/svg;base64,SOME HASH'];

      for (const invalidValues of arrangeInvalidValues) {
        const either = Imagem.factory(invalidValues as unknown as string);

        expect(either.isLeft()).toBeTruthy();
        expect(either.value).toBe('imagem deve ser do tipo jpeg ou png');
      }
    });
  });
});
