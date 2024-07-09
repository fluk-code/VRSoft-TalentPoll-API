import { Loja } from './loja.entity';

describe(Loja.name, () => {
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
