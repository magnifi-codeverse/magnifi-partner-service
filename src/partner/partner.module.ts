import { Module } from "@nestjs/common";
import { PartnerController } from "./partner.controller";
import { PartnerService } from "./partner.service";
import { PartnerRepository } from "./repositories/partner.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Partner } from "./entities/partner.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Partner])],
  controllers: [PartnerController],
  providers: [PartnerService, PartnerRepository],
  exports: [PartnerRepository],
})
export class PartnerModule {}
