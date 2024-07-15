/* eslint-disable sonarjs/no-duplicate-string */
import request from 'supertest';
import { DataSource } from 'typeorm';

import { HttpStatus, INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import LojaTypeOrm from '../../src/loja/infra/data/typeorm/entities/loja-typeorm.entity';
import { LojaTypeOrmRepository } from '../../src/loja/infra/data/typeorm/repositories/loja-typeorm.repository';
import appSetup from '../utils/app-setup';

let id: number;

describe('[DELETE] /api/v1/lojas/:id', () => {
  let app: INestApplication;
  let module: TestingModule;
  let dataSource: DataSource;

  beforeAll(async () => {
    const { moduleFixture, nestApplication } = await appSetup();
    app = nestApplication;
    module = moduleFixture;
    dataSource = moduleFixture.get<DataSource>(DataSource);
  });

  beforeEach(async () => {
    const output = await dataSource
      .createQueryBuilder()
      .insert()
      .into(LojaTypeOrm)
      .values({
        descricao: 'Some descriptions',
      })
      .execute();

    id = output.raw[0].id;
  });

  afterEach(async () => {
    await dataSource.createQueryBuilder().delete().from(LojaTypeOrm).execute();
  });

  it('deve retornar 200 quando a chamada for bem sucedida', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/lojas/${id}`)
      .set('Content-Type', 'application/json')
      .send();

    expect(response.statusCode).toEqual(HttpStatus.OK);
  });

  it('deve retornar 404 quando o id nao for encontrado', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/lojas/0`)
      .set('Content-Type', 'application/json')
      .send();

    expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
  });

  it('deve retornar 500 quando ocorrer um erro inesperado na busca do recurso', async () => {
    const repository = module.get<LojaTypeOrmRepository>(LojaTypeOrmRepository);
    jest.spyOn(repository, 'findById').mockRejectedValueOnce(new Error('Some message'));

    const response = await request(app.getHttpServer())
      .delete(`/lojas/${id}`)
      .set('Content-Type', 'application/json')
      .send();

    expect(response.statusCode).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('deve retornar 500 quando ocorrer um erro inesperado na exclusão do recurso', async () => {
    const repository = module.get<LojaTypeOrmRepository>(LojaTypeOrmRepository);
    jest.spyOn(repository, 'delete').mockRejectedValueOnce(new Error('Some message'));

    const response = await request(app.getHttpServer())
      .delete(`/lojas/${id}`)
      .set('Content-Type', 'application/json')
      .send();

    expect(response.statusCode).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});
