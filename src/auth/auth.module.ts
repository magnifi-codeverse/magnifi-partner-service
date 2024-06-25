import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { CommonModule } from "../common/common.module";
import { JwtClientStrategy } from "./strategies/jwt-client.strategy";
import { JwtPartnerStrategy } from "./strategies/jwt-partner.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { EnvService } from "../common/env.service";
import { PartnerModule } from "../partner/partner.module";

@Module({
  imports: [
    CommonModule,
    PartnerModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [CommonModule],
      inject: [EnvService],
      useFactory: async (envService: EnvService) => ({
        secret: envService.get("JWT_CLIENT_SECRET"),
      }),
    }),
    JwtModule.registerAsync({
      imports: [CommonModule],
      inject: [EnvService],
      useFactory: async (envService: EnvService) => ({
        secret: envService.get("JWT_PARTNER_SECRET"),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtClientStrategy, JwtPartnerStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
