import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Manager } from "./entities";
import { ManagerController } from "./manager.controller";
import { ManagerService } from "./manager.service";
import { AccountModule } from "../accounts";

@Module({
  imports: [
    TypeOrmModule.forFeature([Manager]),
    forwardRef(() => AccountModule),
  ],
  controllers: [ManagerController],
  providers: [ManagerService],
  exports: [ManagerService],
})
export class ManagerModule {}
