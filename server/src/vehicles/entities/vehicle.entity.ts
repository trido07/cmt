import { OneToMany, Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Trip } from "../../trips/entities";

@Entity({ name: "vehicle" })
export class Vehicle {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 9 })
  licensePlate!: string;

  @Column({ type: "varchar", length: 11 })
  payload!: string;

  @Column({ type: "varchar", length: 50 })
  size!: string;

  @OneToMany(() => Trip, (trip) => trip.vehicle)
  trips!: Trip[];

  @Column({ type: "varchar", length: 255, default: "" })
  note!: string;

  @Column({ type: "boolean", default: false })
  isDeleted!: boolean;
}
