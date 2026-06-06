import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { config } from "./config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AccountModule } from "./accounts";
import { CustomerModule } from "./customers";
import { DriverModule } from "./drivers";
import { ManagerModule } from "./managers";
import { TripModule } from "./trips";
import { VehicleModule } from "./vehicles";
import { AuthModule } from "./auth";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...configService.get<TypeOrmModuleOptions>("db"),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    AccountModule,
    CustomerModule,
    DriverModule,
    ManagerModule,
    TripModule,
    VehicleModule,
  ],
})
export class AppModule {}
