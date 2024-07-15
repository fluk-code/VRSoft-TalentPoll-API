import { SortOptions } from '@shared/application/dtos/search-input.dto';

import { QueryBuilder } from './query.builder';

class QueryBuilderStub extends QueryBuilder<
  { attr: string; relation: { attr: string } },
  { attr: SortOptions }
> {}

describe(QueryBuilder.name, () => {
  it('Deve adicionar ao where quando metodo addWhyereCondition for chamado', () => {
    const fakeFilterValue = 'some value';
    const query = new QueryBuilderStub().addWhereCondition('attr', fakeFilterValue).build();

    expect(query.where).toStrictEqual({
      attr: fakeFilterValue,
    });
  });

  it('Deve adicionar ao order quando metodo addOrderCondition for chamado', () => {
    const fakeSortValue = 'ASC';
    const query = new QueryBuilderStub().addOrderCondition('attr', fakeSortValue).build();

    expect(query.order).toStrictEqual({
      attr: fakeSortValue,
    });
  });

  it('Deve adicionar ao skip e take quando metodo andPaginate for chamado', () => {
    const fakePerPage = 55;
    const fakePage = 3;
    const query = new QueryBuilderStub().andPaginate(fakePage, fakePerPage).build();

    expect(query.take).toStrictEqual(fakePerPage);
    expect(query.skip).toStrictEqual(110);
  });

  it('Deve adiciona where em tabelas relacionadas quando andWhereRelationCondition for chamado', () => {
    let query = new QueryBuilderStub()
      .andWhereRelationCondition('relation', 'attr', 'value')
      .build();

    expect(query.where).toStrictEqual({
      relation: { attr: 'value' },
    });

    query = new QueryBuilderStub()
      .andWhereRelationCondition('relation', 'attr', 'value')
      .andWhereRelationCondition('relation', 'attr', 'new value')
      .build();

    expect(query.where).toStrictEqual({
      relation: { attr: 'new value' },
    });
  });
});
