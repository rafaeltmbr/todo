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

  @Column("char(6)")
  code!: string;

  @Column()
  attemps!: number;

  @CreateDateColumn()
  created_at!: string;

  @UpdateDateColumn()
  updated_at!: string;
}
