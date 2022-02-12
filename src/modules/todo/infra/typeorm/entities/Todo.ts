import "../../../../../shared/config/moduleAlias";
import { StorageProvider } from "@shared/providers/storage/implementations";
import {
  AfterLoad,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

export interface ITodoListItem {
  value: string;
  done: boolean;
}

@Entity({ name: "todo" })
export class Todo {
  @PrimaryColumn("uuid")
  id!: string;

  @Column("uuid")
  user_id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column("json")
  list!: ITodoListItem[];

  @Column({ type: "varchar" })
  image_url!: string | null;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @AfterLoad()
  buildImageUrl() {
    this.image_url =
      this.image_url &&
      new StorageProvider().getUrlFromFilePath(this.image_url);
  }

  @BeforeUpdate()
  buildImagePath() {
    this.image_url =
      this.image_url &&
      new StorageProvider().getFilePathFromUrl(this.image_url);
  }
}
