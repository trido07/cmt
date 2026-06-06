import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "./entities";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { AccountModule } from "../accounts";

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    forwardRef(() => AccountModule),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
