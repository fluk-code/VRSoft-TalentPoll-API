import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableLojas1720532694079 implements MigrationInterface {
  #tableName: string = 'lojas';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.#tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'descricao',
            type: 'varchar(60)',
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.#tableName);
  }
}
