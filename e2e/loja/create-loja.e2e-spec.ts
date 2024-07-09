/* eslint-disable sonarjs/no-duplicate-string */
import request from 'supertest';
import { DataSource } from 'typeorm';

import { HttpStatus, INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import LojaTypeOrm from '../../src/loja/infra/data/typeorm/entities/loja-typeorm.entity';
import { LojaTypeOrmRepository } from '../../src/loja/infra/data/typeorm/repositories/loja-typeorm.repository';
import appSetup from '../utils/app-setup';

describe('[POST] /api/v1/lojas', () => {
  let app: INestApplication;
  let module: TestingModule;
  let dataSource: DataSource;

  beforeAll(async () => {
    const { moduleFixture, nestApplication } = await appSetup();
    app = nestApplication;
    module = moduleFixture;
    dataSource = moduleFixture.get<DataSource>(DataSource);
  });

  afterEach(async () => {
    await dataSource.createQueryBuilder().delete().from(LojaTypeOrm).execute();
  });

  it('deve retornar 201 quando a chamada for bem sucedida', async () => {
    const response = await request(app.getHttpServer())
      .post(`/lojas`)
      .set('Content-Type', 'application/json')
      .send({
        descricao: 'Some description',
      });

    expect(response.statusCode).toEqual(HttpStatus.CREATED);
    expect(response.body).toEqual({
      id: 1,
      descricao: 'Some description',
    });
  });

  it('deve retornar 400 quando o body for invalid', async () => {
    const response = await request(app.getHttpServer())
      .post(`/lojas`)
      .set('Content-Type', 'application/json')
      .send();

    expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
  });

  it('deve retornar 422 quando ocorrer um erro inesperado', async () => {
    const repository = module.get<LojaTypeOrmRepository>(LojaTypeOrmRepository);
    jest.spyOn(repository, 'save').mockResolvedValueOnce({
      id: 0,
      descricao: 'Some description',
    });

    const response = await request(app.getHttpServer())
      .post(`/lojas`)
      .set('Content-Type', 'application/json')
      .send({
        descricao: 'Some description',
      });

    expect(response.statusCode).toEqual(HttpStatus.UNPROCESSABLE_ENTITY);
  });

  it('deve retornar 500 quando ocorrer um erro inesperado', async () => {
    const repository = module.get<LojaTypeOrmRepository>(LojaTypeOrmRepository);
    jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error('Some message'));

    const response = await request(app.getHttpServer())
      .post(`/lojas`)
      .set('Content-Type', 'application/json')
      .send({
        descricao: 'Some description',
      });

    expect(response.statusCode).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});
