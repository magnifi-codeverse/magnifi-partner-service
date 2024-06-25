import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Request, Res, UseGuards } from "@nestjs/common";
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

  @Post("reset")
  @UseGuards(JwtClientGuard)
  async reset(
    @Request() req: FastifyRequestWithJwtClientUser,
    @Body() generateDto: GenerateDto,
    @Res() res: FastifyReply,
  ): Promise<string> {
    const user = req.user;
    const entityId = generateDto.entityId;
    const _log_ctx = { entityId, user };
    try {
      this.logger.log("Reset API token requested by user", { ..._log_ctx });

      const partner_jwt = await this.authService.generate(user, entityId);
      this.logger.log("API token reset successfully", { ..._log_ctx });

      return res.status(HttpStatus.CREATED).send({
        statusCode: HttpStatus.CREATED,
        message: "Partner API token reset successfully",
        data: { partner_jwt },
      });
    } catch (error) {
      this.logger.error("Failed to reset API token", { error, ..._log_ctx });
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Failed to reset API token. Please contact support with your entityId.",
        data: null,
      });
    }
  }

  @Delete("remove/:partnerTokenId")
  @UseGuards(JwtClientGuard)
  async remove(
    @Request() req: FastifyRequestWithJwtClientUser,
    @Param("partnerTokenId") partnerTokenId: string,
    @Res() res: FastifyReply,
  ): Promise<string> {
    const user = req.user;
    const _log_ctx = { partnerTokenId, user };
    try {
      this.logger.log("Remove API token requested by user", { ..._log_ctx });

      await this.authService.remove(user, partnerTokenId);
      this.logger.log("API token removed successfully", { ..._log_ctx });

      return res.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        message: "Partner API token removed successfully",
        data: null,
      });
    } catch (error) {
      this.logger.error("Failed to remove API token", { error, ..._log_ctx });
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Failed to remove API token. Please contact support with your entityId.",
        data: null,
      });
    }
  }

  @Get("list/:entityId")
  @UseGuards(JwtClientGuard)
  async list(
    @Request() req: FastifyRequestWithJwtClientUser,
    @Param("entityId") entityId: string,
    @Res() res: FastifyReply,
  ): Promise<string> {
    const user = req.user;
    const _log_ctx = { entityId, user };
    try {
      this.logger.log("List API token requested by user", { ..._log_ctx });

      const partnerTokens = await this.authService.list(user, entityId);
      this.logger.log("API token listed successfully", { ..._log_ctx });

      return res.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        message: "Partner API token listed successfully",
        data: { partnerTokens },
      });
    } catch (error) {
      this.logger.error("Failed to list API token", { error, ..._log_ctx });
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Failed to list API token. Please contact support with your entityId.",
        data: null,
      });
    }
  }
}
