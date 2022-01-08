import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEmailCodeTable1641657423864 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "email_code",
        columns: [
          {
            name: "email",
            type: "varchar",
            isPrimary: true,
            isUnique: true,
            isNullable: false,
          },
          {
            name: "code",
            type: "char(6)",
            isNullable: false,
          },
          {
            name: "attempts",
            type: "int",
            isNullable: false,
            default: 0,
          },
          {
            name: "created_at",
            type: "timestamp",
            isNullable: false,
            default: "now()",
          },
          {
            name: "update_at",
            type: "timestamp",
            isNullable: false,
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("email_code");
  }
}
