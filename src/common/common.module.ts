import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EnvService } from "./env.service";
import { LoggerService } from "./logger.service";
import { LoggingMiddleware } from "./middlewares/logger.middleware";
import { RequestIdMiddleware } from "./middlewares/request-id.middleware";

@Module({
  imports: [ConfigModule],
  providers: [EnvService, LoggerService, LoggingMiddleware, RequestIdMiddleware],
  exports: [EnvService, LoggerService, LoggingMiddleware, RequestIdMiddleware],
})
export class CommonModule {}
