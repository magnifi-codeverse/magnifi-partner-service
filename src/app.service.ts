import { Injectable } from "@nestjs/common";
import { EnvService } from "./common/env.service";
import { LoggerService } from "./common/logger.service";

@Injectable()
export class AppService {
  constructor(
    private readonly envService: EnvService,
    private readonly logger: LoggerService,
  ) {}

  getHello(): string {
    this.logger.log("Hello World is running!", { context: "AppService" });
    return `Hello World is running at ${this.envService.get("PORT")}!`;
  }
}
