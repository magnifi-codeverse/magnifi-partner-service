import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtClientGuard } from "./guards/jwt-client.guard";
import { LoggerService } from "../common/logger.service";
import { FastifyRequestWithJwtClientUser } from "../common/interface/fastify";
import { GenerateDto } from "./dto/generate.dto";

@Controller({
  path: "auth",
  version: "1",
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: LoggerService,
  ) {}

  @Post("generate")
  @UseGuards(JwtClientGuard)
  async generate(@Request() req: FastifyRequestWithJwtClientUser, @Body() generateDto: GenerateDto): Promise<string> {
    const user = req.user;
    const entityId = generateDto.entityId;
    this.logger.log("Generate API token requested by user", { entityId, user });
    return await this.authService.generate(user, entityId);
  }
}
