import {
  OneToOne,
  JoinColumn,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "../../accounts/entities";

@Entity({ name: "manager" })
export class Manager {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => Account)
  @JoinColumn()
  account!: Account;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 11 })
  phone!: string;

  @Column({ type: "varchar", length: 255, default: "" })
  note!: string;

  @Column({ type: "boolean", default: false })
  isDeleted!: boolean;
}
