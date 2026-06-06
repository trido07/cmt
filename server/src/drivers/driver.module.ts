import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Driver } from "./entities";
import { DriverService } from "./driver.service";
import { DriverController } from "./driver.controller";
import { AccountModule } from "../accounts";

@Module({
  imports: [
    TypeOrmModule.forFeature([Driver]),
    forwardRef(() => AccountModule),
  ],
  controllers: [DriverController],
  providers: [DriverService],
  exports: [DriverService],
})
export class DriverModule {}
