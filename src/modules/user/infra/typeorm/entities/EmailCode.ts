import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("email_code")
export class EmailCode {
  @PrimaryColumn("varchar")
  email!: string;

  @Column("char")
  code!: string;

  @Column()
  attempts!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
