import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableProduto1720891768858 implements MigrationInterface {
  #tableName: string = 'produtos';

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
          {
            name: 'custo',
            type: 'numeric(13, 3)',
            isNullable: true,
          },
          {
            name: 'imagem',
            type: 'bytea',
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.#tableName);
  }
}
