import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-custom";
import { EnvService } from "../../common/env.service";
import { PartnerService } from "../../partner/partner.service";

@Injectable()
export class ApiKeyPartnerStrategy extends PassportStrategy(Strategy, "api-key-partner") {
  constructor(
    private readonly envService: EnvService,
    private readonly partnerService: PartnerService,
  ) {
    super();
  }

  async validate(req: Request): Promise<any> {
    const entityId = req.headers["x-entity-id"];
    const apiKey = req.headers["x-api-key"];
    const requestId = req.headers["x-request-id"];

    if (!entityId || !apiKey) {
      throw new UnauthorizedException("Invalid api key");
    }

    const allowAccess = await this.partnerService.checkIfValidPartnerApiKey(entityId, apiKey, requestId);

    if (allowAccess) {
      return allowAccess;
    }

    throw new UnauthorizedException("Invalid api key");
  }
}
