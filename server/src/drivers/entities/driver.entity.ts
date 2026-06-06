import {
  OneToOne,
  OneToMany,
  JoinColumn,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "../../accounts/entities";
import { Trip } from "../../trips/entities";

@Entity({ name: "driver" })
export class Driver {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => Account)
  @JoinColumn()
  account!: Account;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 11 })
  phone!: string;

  @OneToMany(() => Trip, (trip) => trip.driver)
  trips!: Trip[];

  @Column({ type: "varchar", length: 255, default: "" })
  note!: string;

  @Column({ type: "boolean", default: false })
  isDeleted!: boolean;
}
