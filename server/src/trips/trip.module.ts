import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Trip } from "./entities";
import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";
import { CustomerModule } from "../customers";
import { ManagerModule } from "../managers";

@Module({
  imports: [
    TypeOrmModule.forFeature([Trip]),
    forwardRef(() => CustomerModule),
    forwardRef(() => ManagerModule),
  ],
  controllers: [TripController],
  providers: [TripService],
  exports: [TripService],
})
export class TripModule {}
