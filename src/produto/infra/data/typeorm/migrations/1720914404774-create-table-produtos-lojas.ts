import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableProdutoLoja1720914404774 implements MigrationInterface {
  #tableName: string = 'produtos_lojas';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.#tableName,
        columns: [
          {
            name: 'id_produto',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'id_loja',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'preco_venda',
            type: 'numeric(13, 3)',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'FK_produtos',
            referencedTableName: 'produtos',
            referencedColumnNames: ['id'],
            columnNames: ['id_produto'],
            onUpdate: 'CASCADE',
          },
          {
            name: 'FK_lojas',
            referencedTableName: 'lojas',
            referencedColumnNames: ['id'],
            columnNames: ['id_loja'],
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.#tableName);
  }
}
