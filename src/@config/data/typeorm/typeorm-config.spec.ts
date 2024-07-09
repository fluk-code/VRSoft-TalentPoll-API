import typeormConfig from './typeorm-config';

describe('typeormConfig', () => {
  beforeAll(() => {
    process.env.DB_TYPE = 'some type';
    process.env.DB_HOST = 'some host';
    process.env.DB_PORT = '1234';
    process.env.DB_USERNAME = 'some user';
    process.env.DB_PASSWORD = 'some pass';
    process.env.DB_DATABASE = 'some DB';
    process.env.DB_LOGGING = 'true';
  });

  it('deve gerar TypeOrmModuleOptions', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const config = typeormConfig() as any;

    expect(config.type).toBe('some type');
    expect(config.host).toBe('some host');
    expect(config.port).toBe(1234);
    expect(config.username).toBe('some user');
    expect(config.password).toBe('some pass');
    expect(config.database).toBe('some DB');
    expect(config.logging).toBe(true);
    expect(config.synchronize).toBe(false);
    expect(config.migrationsTableName).toBe('migrations');
    expect(config.migrationsRun).toBe(true);
    expect(config.entities).toStrictEqual(['./dist/**/infra/data/typeorm/entities/**/*{.ts,.js}']);
    expect(config.migrations).toStrictEqual([
      './dist/**/infra/data/typeorm/migrations/**/*{.ts,.js}',
    ]);
  });

  it('should generate TypeOrmModuleOptions for "src" path', () => {
    const config = typeormConfig('src');
    expect(config.entities).toStrictEqual(['./src/**/infra/data/typeorm/entities/**/*{.ts,.js}']);
    expect(config.migrations).toStrictEqual([
      './src/**/infra/data/typeorm/migrations/**/*{.ts,.js}',
    ]);
  });
});
