import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Request, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoggerService } from "../common/logger.service";
import { GenerateDto } from "./dto/generate.dto";
import { FastifyReply } from "fastify";
import { ApiKeyMagnifiGuard } from "./guards/api-key-magnifi.guard";
import { RequestId } from "../common/decorators/request-id.decorator";
import { ResetDto } from "./dto/reset.dto";
import { RemoveDto } from "./dto/remove.dto";

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
  @UseGuards(ApiKeyMagnifiGuard)
  async generate(
    @RequestId() requestId: string,
    @Body() generateDto: GenerateDto,
    @Res() res: FastifyReply,
  ): Promise<Record<string, any>> {
    const { entityId, userId, organizationMemberId } = generateDto;
    const partnerDetails = { entityId, userId, organizationMemberId };
    const _log_ctx = { entityId, requestId };

    try {
      this.logger.log("Generate Partner API key requested by user", { ..._log_ctx });

      const response = await this.authService.generate(partnerDetails, _log_ctx);

      this.logger.log("Partner API key generated successfully", {
        ..._log_ctx,
        partner_api_key_id: response.partnerApiKeyId,
      });

      return res.status(HttpStatus.CREATED).send({
        statusCode: HttpStatus.CREATED,
        message:
          "Partner API key generated successfully. Please note the partner API key down. It will not be shown again.",
        data: response,
      });
    } catch (error) {
      this.logger.error("Failed to generate Partner API key", { error, ..._log_ctx });
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Failed to generate Partner API key. Please contact support with your entityId.",
        data: null,
      });
    }
  }

  @Post("reset")
  @UseGuards(ApiKeyMagnifiGuard)
  async reset(
    @RequestId() requestId: string,
    @Body() resetDto: ResetDto,
    @Res() res: FastifyReply,
  ): Promise<Record<string, any>> {
    const { entityId, userId, organizationMemberId } = resetDto;
    const partnerDetails = { entityId, userId, organizationMemberId };
    const _log_ctx = { entityId, requestId };
    try {
      this.logger.log("Reset Partner API key requested by user", { ..._log_ctx });

      const response = await this.authService.generate(partnerDetails, _log_ctx);

      this.logger.log("Partner API key reset successfully", {
        ..._log_ctx,
        partner_api_key_id: response.partnerApiKeyId,
      });

      return res.status(HttpStatus.CREATED).send({
        statusCode: HttpStatus.CREATED,
        message:
          "Partner API key reset successfully. Please note the partner API key down. It will not be shown again.",
        data: response,
      });
    } catch (error) {
      this.logger.error("Failed to reset API key", { error, ..._log_ctx });
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Failed to reset API key. Please contact support with your entityId.",
        data: null,
      });
    }
  }

  @Get(":entityId/list")
  @UseGuards(ApiKeyMagnifiGuard)
  async list(
    @RequestId() requestId: string,
    @Param("entityId") entityId: string,
    @Query("showAll") showAll: string,
    @Res() res: FastifyReply,
  ): Promise<Record<string, any>> {
    const _log_ctx = { entityId, requestId };
    try {
      this.logger.log("List Partner API tokens requested by user", { ..._log_ctx });

      const partnerApiKeys = await this.authService.list(entityId, showAll === "true");

      this.logger.log("Partner API tokens listed successfully", { ..._log_ctx });

      return res.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        message: "Partner API tokens listed successfully",
        data: partnerApiKeys,
      });
    } catch (error) {
      this.logger.error("Failed to list API tokens", { error, ..._log_ctx });
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Failed to list API tokens. Please contact support with your entityId.",
        data: null,
      });
    }
  }

  @Delete("remove")
  @UseGuards(ApiKeyMagnifiGuard)
  async remove(
    @RequestId() requestId: string,
    @Body() removeDto: RemoveDto,
    @Res() res: FastifyReply,
  ): Promise<Record<string, any>> {
    const { partnerApiKeyId, entityId } = removeDto;
    const _log_ctx = { partnerApiKeyId, entityId, requestId };

    try {
      this.logger.log("Remove Partner API key requested by user", { ..._log_ctx });

      await this.authService.remove(removeDto, _log_ctx);

      this.logger.log("Partner API key removed successfully", { ..._log_ctx });

      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      this.logger.error("Failed to remove API key", { error, ..._log_ctx });
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Failed to remove API key. Please contact support with your entityId.",
        data: null,
      });
    }
  }
}
