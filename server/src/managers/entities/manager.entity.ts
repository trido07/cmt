import {
  OneToOne,
  JoinColumn,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Account } from "../../accounts/entities";
import { Customer } from "../../customers/entities";

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

  @OneToMany(() => Customer, (customer) => customer.manager)
  customers!: Customer[];

  @Column({ type: "varchar", length: 255, default: "" })
  note!: string;

  @Column({ type: "boolean", default: false })
  isDeleted!: boolean;
}
