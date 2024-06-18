import { Injectable, LoggerService as NestLoggerService } from "@nestjs/common";
import { createLogger, format, transports, Logger } from "winston";

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: "info",
      format: format.combine(format.timestamp(), format.errors({ stack: true }), format.splat(), format.json()),
      defaultMeta: { service: "app-service" },
      transports: [
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        }),
        // Add more transports like file transport here if needed
      ],
    });
  }

  log(message: string, context?: Record<string, any>) {
    this.logger.info(message, context);
  }

  error(message: string, trace?: string, context?: Record<string, any>) {
    this.logger.error(message, { ...context, trace });
  }

  warn(message: string, context?: Record<string, any>) {
    this.logger.warn(message, context);
  }

  debug(message: string, context?: Record<string, any>) {
    this.logger.debug(message, context);
  }

  verbose(message: string, context?: Record<string, any>) {
    this.logger.verbose(message, context);
  }
}
