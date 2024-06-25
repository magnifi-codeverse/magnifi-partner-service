import * as jwt from "jsonwebtoken";
import { createHmac } from "crypto";
import { Injectable } from "@nestjs/common";
import { JwtClientUser } from "../common/interface/fastify";
import { PartnerTokenRepository } from "../partner/repositories/partner.repository";
import { LoggerService } from "../common/logger.service";
import { PartnerToken } from "../partner/entities/partner.entity";
import { EnvService } from "../common/env.service";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class AuthService {
  constructor(
    private partnerRepository: PartnerTokenRepository,
    private readonly logger: LoggerService,
    private readonly envService: EnvService,
  ) {}

  async markPartnerTokenAsRevoked(unRevokedPartnerTokens: PartnerToken[], _log_ctx: {}): Promise<void> {
    this.logger.log("Pre-existing partner details found. Revoking existing token.", { ..._log_ctx });
    for (const partnerToken of unRevokedPartnerTokens) {
      partnerToken.is_revoked = true;
      await this.partnerRepository.save(partnerToken);
    }
  }

  hashClientJwtToken(jwtToken: string): string {
    try {
      return createHmac("sha256", this.envService.get("JWT_CLIENT_HASH_SECRET")).update(jwtToken).digest("hex");
    } catch (error) {
      this.logger.error("Failed to hash JWT token", { error });
      throw new Error("Failed to hash JWT token");
    }
  }

  generatePartnerJwtToken(entity_id: string, partner_token_id: string, user_id: string): string {
    try {
      const payload = {
        entity_id,
        partner_token_id,
        user_id,
      };
      return jwt.sign(payload, this.envService.get("JWT_PARTNER_SECRET"));
    } catch (error) {
      this.logger.error("Failed to generate partner JWT token", { error });
      throw new Error("Failed to generate partner JWT token");
    }
  }

  generatePartnerObj(user: JwtClientUser, entityId: string): PartnerToken {
    const partnerObj = new PartnerToken();
    partnerObj.partner_token_id = `pti_${uuidv4()}`;
    partnerObj.entity_id = entityId;
    partnerObj.user_id = user.userId;
    partnerObj.name = user.name;
    partnerObj.scope = user.scope;
    partnerObj.client_jwt_hash = this.hashClientJwtToken(user.jwt_token);
    partnerObj.partner_jwt = this.generatePartnerJwtToken(entityId, partnerObj.partner_token_id, user.userId);
    partnerObj.is_revoked = false;
    return partnerObj;
  }

  async generate(user: JwtClientUser, entityId: string): Promise<string> {
    const _log_ctx = { entityId, user };
    const unRevokedPartnerTokens = await this.partnerRepository.findByEntityIdUnRevoked(entityId);

    if (unRevokedPartnerTokens && unRevokedPartnerTokens.length > 0) {
      await this.markPartnerTokenAsRevoked(unRevokedPartnerTokens, _log_ctx);
    }

    this.logger.log("Creating new partner details", { ..._log_ctx });
    const partnerObj = this.generatePartnerObj(user, entityId);

    const partner = await this.partnerRepository.create(partnerObj);
    if (!partner || !partner.partner_jwt) {
      this.logger.error("Failed to create partner details", { ..._log_ctx });
      throw new Error("Failed to create partner details");
    }

    return partner.partner_jwt;
  }
}
