import {
  JoinColumn,
  OneToOne,
  OneToMany,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Account } from "../../accounts/entities";
import { Trip } from "../../trips/entities";
import { Manager } from "../../managers/entities";

@Entity({ name: "customer" })
export class Customer {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => Account)
  @JoinColumn()
  account!: Account;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 11 })
  phone!: string;

  @Column({ type: "varchar", length: 255 })
  contactName!: string;

  @Column({ type: "varchar", length: 11 })
  contactPhone!: string;

  @ManyToOne(() => Manager, (manager) => manager.customers)
  manager!: Manager;

  @OneToMany(() => Trip, (trip) => trip.vehicle)
  trips!: Trip[];

  @Column({ type: "varchar", length: 255, default: "" })
  note!: string;

  @Column({ type: "boolean", default: false })
  isDeleted!: boolean;
}
