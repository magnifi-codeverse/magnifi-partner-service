import { Module } from "@nestjs/common";
import { PartnerController } from "./partner.controller";
import { PartnerService } from "./partner.service";
import { PartnerTokenRepository } from "./repositories/partner.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartnerToken } from "./entities/partner.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PartnerToken])],
  controllers: [PartnerController],
  providers: [PartnerService, PartnerTokenRepository],
  exports: [PartnerTokenRepository],
})
export class PartnerModule {}
