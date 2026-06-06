import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AccountModule } from "../accounts";
import { APP_GUARD } from "@nestjs/core";
import { RoleGuard } from "./role.guard";

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("jwtSecret"),
        signOptions: {
          expiresIn: configService.get<string>("jwtExpiration"),
        },
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => AccountModule),
  ],
  providers: [AuthService, { provide: APP_GUARD, useClass: RoleGuard }],
  controllers: [],
  exports: [AuthService],
})
export class AuthModule {}
