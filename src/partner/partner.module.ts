import { Module } from "@nestjs/common";
import { PartnerController } from "./partner.controller";
import { PartnerService } from "./partner.service";
import { PartnerApiKeyRepository } from "./repositories/partner.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartnerApiKey } from "./entities/partner.entity";
import { CommonModule } from "../common/common.module";

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([PartnerApiKey])],
  controllers: [PartnerController],
  providers: [PartnerApiKeyRepository, PartnerService],
  exports: [PartnerApiKeyRepository, PartnerService],
})
export class PartnerModule {}
