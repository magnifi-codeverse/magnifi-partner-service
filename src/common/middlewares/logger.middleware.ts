import { Injectable, NestMiddleware } from "@nestjs/common";
import { FastifyRequest, FastifyReply } from "fastify";
import { LoggerService } from "../logger.service";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: FastifyRequest["raw"], res: FastifyReply["raw"], next: () => void) {
    const { method, headers } = req;
    const url = (req as any).originalUrl || req.url;
    const start = Date.now();
    const userAgent = headers["user-agent"];
    const requestId = headers["x-request-id"] || "N/A";
    const ip = req.socket.remoteAddress;

    res.on("finish", () => {
      const { statusCode } = res;
      const contentLength = res.getHeader("content-length") || "0";
      const duration = Date.now() - start;

      this.logger.log("Request completed", {
        request: {
          method,
          url,
          statusCode,
          contentLength,
          duration,
          userAgent,
          ip,
          requestId,
        },
      });
    });

    res.on("error", (err) => {
      const duration = Date.now() - start;

      this.logger.error("Request error", {
        request: {
          method,
          url,
          statusCode: res.statusCode,
          duration,
          userAgent,
          ip,
          errorMessage: err.message,
        },
      });
    });

    next();
  }
}
