import * as crypto from "crypto";
import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { LoggerService } from "../common/logger.service";
import { EnvService } from "../common/env.service";

import { PartnerService } from "../partner/partner.service";
import { PartnerApiKey } from "../partner/entities/partner.entity";
import { plainToInstance } from "class-transformer";
import { PartnerApiKeyResponseDto } from "./dto/list.dto";
import { GenerateResponseDto } from "./dto/generate.dto";
import { validateSync } from "class-validator";
import { RemoveDto } from "./dto/remove.dto";

@Injectable()
export class AuthService {
  constructor(
    private partnerService: PartnerService,
    private readonly logger: LoggerService,
    private readonly envService: EnvService,
  ) {}

  async generateAndHashApiKey(length: number = 32): Promise<{ apiKey: string; hash: string }> {
    const apiKey = crypto.randomBytes(length).toString("hex");
    const hash = await bcrypt.hash(apiKey, 10);
    return { apiKey, hash };
  }

  async generate(partnerDetails: Record<string, any>, _log_ctx: Record<string, any>): Promise<GenerateResponseDto> {
    const { entityId } = partnerDetails;

    this.logger.log("Creating new partner api key", { ..._log_ctx });
    await this.partnerService.markPartnerApiKeysAsRevoked(entityId, _log_ctx);

    const { apiKey, hash } = await this.generateAndHashApiKey();
    const partnerObj = this.partnerService.generatePartnerApiKeyObj(partnerDetails, hash);

    const partner = await this.partnerService.createPartnerApiKey(partnerObj);
    if (!partner || !partner.hashed_api_key) {
      this.logger.error("Failed to create partner api key", { ..._log_ctx });
      throw new Error("Failed to create partner details");
    }

    const transformedInstance = plainToInstance(
      GenerateResponseDto,
      { partner_api_key: apiKey, partner_api_key_id: partner.partner_api_key_id, entity_id: partner.entity_id },
      {
        excludeExtraneousValues: true,
      },
    );

    const errors = validateSync(transformedInstance);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.toString()}`);
    }

    return transformedInstance;
  }

  async list(entityId: string, showAll: boolean): Promise<PartnerApiKeyResponseDto[]> {
    const partnerApiKeys = await this.partnerService.listPartnerApiKeys(entityId, showAll);

    const transformedInstance = plainToInstance(PartnerApiKeyResponseDto, partnerApiKeys, {
      excludeExtraneousValues: true,
    });

    const errors = validateSync(transformedInstance);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.toString()}`);
    }

    return transformedInstance;
  }

  async remove(removeDto: RemoveDto, _log_ctx: Record<string, any>): Promise<PartnerApiKey> {
    return await this.partnerService.removeByPartnerApiKey(removeDto, _log_ctx);
  }
}
