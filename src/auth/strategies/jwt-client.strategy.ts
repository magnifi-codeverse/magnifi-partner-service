import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { EnvService } from "../../common/env.service";

@Injectable()
export class JwtClientStrategy extends PassportStrategy(Strategy, "jwt-client") {
  constructor(private readonly envService: EnvService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envService.get("JWT_CLIENT_SECRET"),
    });
  }

  async validate(payload: any) {
    if (!payload.userId || !payload.name) {
      throw new Error("Invalid token payload: Missing necessary user information");
    }

    return {
      userId: payload.userId,
      name: payload.name,
      scope: payload.scope,
      issuedAt: payload.iat,
      expireAt: payload.exp,
    };
  }
}
