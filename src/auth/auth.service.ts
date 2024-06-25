import { Injectable } from "@nestjs/common";
import { JwtClientUser } from "../common/interface/fastify";
import { PartnerRepository } from "../partner/repositories/partner.repository";
import { LoggerService } from "../common/logger.service";
import { Partner } from "../partner/entities/partner.entity";

@Injectable()
export class AuthService {
  constructor(
    private partnerRepository: PartnerRepository,
    private readonly logger: LoggerService,
  ) {}
  async generate(user: JwtClientUser, entityId: string): Promise<string> {
    const _log_ctx = { entityId, user };
    const items = await this.partnerRepository.findByEntityId(entityId);

    if (items && items.length > 0) {
      this.logger.log("Pre-existing partner details found. Revoking existing token.", { ..._log_ctx });
      for (const item of items) {
        item.revoked = true;
        await this.partnerRepository.save(item);
      }
    }
    this.logger.log("Creating new partner details", { ..._log_ctx });

    const partnerObj = new Partner();
    partnerObj.entity_id = entityId;
    partnerObj.user_id = user.userId;
    partnerObj.token = "1234567890"; //TODO: This should be a random string
    partnerObj.name = user.name;
    partnerObj.scope = user.scope;
    partnerObj.issued_at = user.issuedAt;
    partnerObj.expire_at = user.expireAt;
    partnerObj.revoked = false;

    const partner = await this.partnerRepository.create(partnerObj);
    if (!partner) {
      this.logger.error("Failed to create partner details", { ..._log_ctx });
      throw new Error("Failed to create partner details");
    }

    return partner.token;
  }
}
