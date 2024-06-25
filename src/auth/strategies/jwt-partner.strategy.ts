import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { EnvService } from "../../common/env.service";

@Injectable()
export class JwtPartnerStrategy extends PassportStrategy(Strategy, "jwt-partner") {
  constructor(private readonly envService: EnvService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envService.get("JWT_PARTNER_SECRET"),
    });
  }

  async validate(payload: any) {
    if (!payload.user_id || !payload.entity_id) {
      throw new Error("Invalid JwtPartnerStrategy token payload: Missing necessary user information");
    }

    return {
      user_id: payload.user_id,
      entity_id: payload.entity_id,
      partner_token_id: payload.partner_token_id,
    };
  }
}
