import {
  CreateDateColumn,
  ManyToOne,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Customer } from "../../customers/entities";
import { Vehicle } from "../../vehicles/entities";
import { Driver } from "../../drivers/entities";

@Entity({ name: "trip" })
export class Trip {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Customer, (customer) => customer.trips)
  customer!: Customer;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.trips)
  vehicle!: Vehicle;

  @ManyToOne(() => Driver, (driver) => driver.trips)
  driver!: Driver;

  @Column({ type: "varchar", length: 11 })
  payload!: string;

  @Column({ type: "timestamp", precision: 3 })
  loadDate!: Date;

  @Column({ type: "timestamp", precision: 3, nullable: true })
  driverLoadDate?: Date;

  @CreateDateColumn()
  orderDate!: Date;

  @Column({ type: "varchar", length: 255 })
  loadAddress!: string;

  @Column({ type: "varchar", length: 255 })
  deliveryAddress!: string;

  @Column({ type: "boolean", default: false })
  isDeleted!: boolean;
}
