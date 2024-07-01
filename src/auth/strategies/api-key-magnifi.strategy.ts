import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-custom";
import { EnvService } from "../../common/env.service";

@Injectable()
export class ApiKeyMagnifiStrategy extends PassportStrategy(Strategy, "api-key-magnifi") {
  constructor(private readonly envService: EnvService) {
    super();
  }

  validate(req: Request): any {
    const apiKey = req.headers["x-api-key"];
    const validApiKey = this.envService.get("API_KEY_MAGNIFI");

    if (apiKey === validApiKey) {
      return true; // or return any object or user data you want to attach to the request
    }
    throw new UnauthorizedException();
  }
}
