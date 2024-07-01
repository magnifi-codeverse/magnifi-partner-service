import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { LoggerService } from "../common/logger.service";
import { PartnerApiKey } from "./entities/partner.entity";
import { v4 as uuidv4 } from "uuid";
import { PartnerApiKeyRepository } from "./repositories/partner.repository";
import { RemoveDto } from "../auth/dto/remove.dto";

@Injectable()
export class PartnerService {
  constructor(
    private readonly partnerApiKeyRepository: PartnerApiKeyRepository,
    private readonly logger: LoggerService,
  ) {}

  generatePartnerApiKeyObj(partnerDetails: Record<string, any>, hashedApiKey: string): PartnerApiKey {
    const partnerApiKeyObj = new PartnerApiKey();
    partnerApiKeyObj.entity_id = partnerDetails.entityId;
    partnerApiKeyObj.partner_api_key_id = `pak_${uuidv4()}`;
    partnerApiKeyObj.user_id = partnerDetails.userId;
    partnerApiKeyObj.organization_member_id = partnerDetails.organizationMemberId;
    partnerApiKeyObj.hashed_api_key = hashedApiKey;
    partnerApiKeyObj.is_active = true;
    return partnerApiKeyObj;
  }

  async createPartnerApiKey(partnerApiKey: PartnerApiKey): Promise<PartnerApiKey> {
    return this.partnerApiKeyRepository.create(partnerApiKey);
  }

  async markPartnerApiKeysAsRevoked(entityId: string, _log_ctx: Record<string, any>): Promise<void> {
    const activePartnerApiKeys = await this.partnerApiKeyRepository.findByEntityIdActive(entityId);
    if (!activePartnerApiKeys || activePartnerApiKeys.length === 0) {
      return;
    }

    this.logger.log("Pre-existing partner api keys found. Revoking existing api keys.", {
      ..._log_ctx,
      activePartnerApiKeysLength: activePartnerApiKeys.length,
    });
    for (const partnerApiKey of activePartnerApiKeys) {
      partnerApiKey.is_active = false;
      await this.partnerApiKeyRepository.save(partnerApiKey);
    }
  }

  async listPartnerApiKeys(entityId: string, showAll = false): Promise<Partial<PartnerApiKey>[]> {
    if (showAll) {
      return this.partnerApiKeyRepository.findByEntityId(entityId);
    }
    return this.partnerApiKeyRepository.findByEntityIdActive(entityId);
  }

  async removeByPartnerApiKey(removeDto: RemoveDto, _log_ctx: Record<string, any>): Promise<PartnerApiKey> {
    const partnerApiKey = await this.partnerApiKeyRepository.findOneBy({
      partner_api_key_id: removeDto.partnerApiKeyId,
      entity_id: removeDto.entityId,
    });

    if (!partnerApiKey) {
      this.logger.warn("Partner API key not found", { ..._log_ctx });
      return null;
    }
    partnerApiKey.is_active = false;

    this.logger.log("Revoking partner api key", { ..._log_ctx });
    return await this.partnerApiKeyRepository.save(partnerApiKey);
  }

  async checkIfValidPartnerApiKey(entityId: string, apiKey: string, requestId: string): Promise<boolean> {
    const partnerApiKey = await this.partnerApiKeyRepository.findByEntityIdActive(entityId);

    if (!partnerApiKey || partnerApiKey.length === 0) {
      this.logger.warn("No active partner api key found", { requestId });
      return false;
    }

    const isValid = await bcrypt.compare(apiKey, partnerApiKey[0].hashed_api_key);
    if (!isValid) {
      this.logger.warn("Invalid partner api key", { requestId });
      return false;
    }
    return true;
  }
}
