import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "account" })
export class Account {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // ma - manager
  // cu - customer
  // dr - driver
  @Column({ type: "enum", enum: ["ma", "cu", "dr"] })
  accountType!: "ma" | "cu" | "dr";

  @Column({ type: "varchar", length: 255, unique: true })
  name!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Column({ type: "uuid" })
  userId!: string;
}
