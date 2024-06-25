import { Body, Controller, HttpStatus, Post, Request, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtClientGuard } from "./guards/jwt-client.guard";
import { LoggerService } from "../common/logger.service";
import { FastifyRequestWithJwtClientUser } from "../common/interface/fastify";
import { GenerateDto } from "./dto/generate.dto";
import { FastifyReply } from "fastify";

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
  async generate(
    @Request() req: FastifyRequestWithJwtClientUser,
    @Body() generateDto: GenerateDto,
    @Res() res: FastifyReply,
  ): Promise<string> {
    const user = req.user;
    const entityId = generateDto.entityId;
    const _log_ctx = { entityId, user };
    try {
      this.logger.log("Generate API token requested by user", { ..._log_ctx });

      const partner_jwt = await this.authService.generate(user, entityId);
      this.logger.log("API token generated successfully", { ..._log_ctx });

      return res.status(HttpStatus.CREATED).send({
        statusCode: HttpStatus.CREATED,
        message: "Partner API token generated successfully",
        data: { partner_jwt },
      });
    } catch (error) {
      this.logger.error("Failed to generate API token", { error, ..._log_ctx });
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Failed to generate API token. Please contact support with your entityId.",
        data: null,
      });
    }
  }
}
