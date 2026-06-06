import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Trip } from "./entities";
import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";
import { CustomerModule } from "../customers";

@Module({
  imports: [TypeOrmModule.forFeature([Trip]), forwardRef(() => CustomerModule)],
  controllers: [TripController],
  providers: [TripService],
  exports: [TripService],
})
export class TripModule {}
