import * as dotenv from 'dotenv';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenv.config();

const typeormConfig = (path: 'dist' | 'src' = 'dist'): TypeOrmModuleOptions => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  logging: process.env.DB_LOGGING === 'true',
  synchronize: false,

  entities: [`./${path}/**/infra/data/typeorm/entities/**/*{.ts,.js}`],

  migrationsTableName: 'migrations',
  migrationsRun: true,

  migrations: [`./${path}/**/infra/data/typeorm/migrations/**/*{.ts,.js}`],
});

export default typeormConfig;
