import { DataType, newDb } from 'pg-mem';

import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import typeormConfig from '../../src/@config/data/typeorm/typeorm-config';
import appGlobalConfigs from '../../src/app.config';
import { LojaModule } from '../../src/loja/loja.module';

const appSetup = async () => {
  const db = newDb({
    autoCreateForeignKeyIndices: true,
  });

  db.public.registerFunction({
    implementation: () => 'test',
    name: 'current_database',
  });
  db.public.registerFunction({
    implementation: () => 'test',
    name: 'version',
  });
  db.public.registerFunction({
    implementation: () => null,
    name: 'obj_description',
    args: [DataType.regclass, DataType.text],
  });

  const dbConfig = typeormConfig('src');
  const dataSource = await db.adapters.createTypeormDataSource({
    entities: dbConfig.entities,
    migrations: dbConfig.migrations,
    type: 'postgres',
    migrationsRun: true,
  });

  const moduleFixture = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
      }),
      TypeOrmModule.forRootAsync({
        useFactory: () => ({
          name: 'default',
        }),
        dataSourceFactory: async () => dataSource,
      }),
      LojaModule,
    ],
    providers: [],
  }).compile();

  const nestApplication = moduleFixture.createNestApplication();
  await appGlobalConfigs(nestApplication);

  await nestApplication.init();

  return {
    nestApplication,
    moduleFixture,
  };
};

export default appSetup;
