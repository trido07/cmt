import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "./entities";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { DriverModule } from "../drivers";
import { CustomerModule } from "../customers";
import { AuthModule } from "../auth";
import { ManagerModule } from "../managers";

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    forwardRef(() => DriverModule),
    forwardRef(() => CustomerModule),
    forwardRef(() => ManagerModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
