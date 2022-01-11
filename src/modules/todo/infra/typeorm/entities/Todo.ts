import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

export interface ITodoListItem {
  value: string;
  done: boolean;
}

@Entity({ name: "todo" })
export class Todo {
  @Column("uuid")
  id!: string;

  @Column("uuid")
  user_id!: string;

  @Column()
  name!: string;

  @Column("json")
  list!: ITodoListItem[];

  @Column()
  image_url!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
