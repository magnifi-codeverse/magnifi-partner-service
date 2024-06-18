import { Injectable, NestMiddleware } from "@nestjs/common";
import { FastifyRequest, FastifyReply } from "fastify";
import { LoggerService } from "../logger.service";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: FastifyRequest["raw"], res: FastifyReply["raw"], next: () => void) {
    const { method, url } = req;
    const start = Date.now();

    req.on("finish", () => {
      const { statusCode } = res;
      const contentLength = res.getHeader("content-length");
      const duration = Date.now() - start;
      this.logger.log(`${method} ${url} ${statusCode} ${contentLength} - ${duration}ms`, {
        context: "LoggingMiddleware",
      });
    });

    next();
  }
}
