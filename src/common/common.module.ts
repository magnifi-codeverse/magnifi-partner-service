import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EnvService } from "./env.service";
import { LoggerService } from "./logger.service";
import { LoggingMiddleware } from "./middleware/logger.middleware";

@Module({
  imports: [ConfigModule],
  providers: [EnvService, LoggerService, LoggingMiddleware],
  exports: [EnvService, LoggerService, LoggingMiddleware],
})
export class CommonModule {}
