import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTodoTable1641861934454 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: "todo",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "user_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "description",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "list",
            type: "json",
            isNullable: false,
            default: "'[]'",
          },
          {
            name: "image_url",
            type: "varchar",
            isNullable: true,
            default: null,
          },
          {
            name: "created_at",
            type: "timestamp",
            isNullable: false,
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            isNullable: false,
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "user",
            referencedColumnNames: ["id"],
            name: "FK_todo_user",
            onDelete: "cascade",
            onUpdate: "cascade",
          },
        ],
        uniques: [
          {
            name: "UQ_todo_name_user_id",
            columnNames: ["name", "user_id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable("todo");
  }
}
