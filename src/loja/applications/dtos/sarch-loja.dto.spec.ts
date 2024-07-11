import { SearchInputLojaDTO } from './search-loja.dto';

describe(SearchInputLojaDTO.name, () => {
  it('Deve os valores default quando dto for iniciado', () => {
    const dto = new SearchInputLojaDTO();

    expect(dto.filter).toStrictEqual({
      id: undefined,
      descricao: undefined,
    });
    expect(dto.sort).toStrictEqual({
      id: 'ASC',
    });
    expect(dto.perPage).toBe(50);
    expect(dto.page).toBe(1);
  });

  it('Deve realizar o parse do valor recebido quando um novo filter for inserido', () => {
    const dto = new SearchInputLojaDTO();

    const filterFake = { descricao: 'Some description' };
    dto.filter = JSON.stringify(filterFake);

    expect(dto.filter).toEqual(filterFake);
  });

  it('Deve ignorar o valor recebido quando um novo filter NÃO for uma JSON.stringify', () => {
    const dto = new SearchInputLojaDTO();

    const filterFake = undefined;
    dto.filter = JSON.stringify(filterFake);

    expect(dto.filter).toStrictEqual({
      id: undefined,
      descricao: undefined,
    });
  });

  it('Deve realizar o parse do valor recebido quando um novo sort for inserido', () => {
    const dto = new SearchInputLojaDTO();

    const sortFake = { descricao: 'DESC' };
    dto.sort = JSON.stringify(sortFake);

    expect(dto.sort).toStrictEqual(sortFake);
  });

  it('Deve ignorar o valor recebido quando um novo filter NÃO for uma JSON.stringify', () => {
    const dto = new SearchInputLojaDTO();

    const sortFake = undefined;
    dto.sort = JSON.stringify(sortFake);

    expect(dto.sort).toStrictEqual({
      id: 'ASC',
    });
  });
});
