// src/common/env.service.ts
import { Injectable } from "@nestjs/common";
import * as Joi from "joi";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EnvService {
  private readonly envConfig: Record<string, string>;

  constructor(private configService: ConfigService) {
    this.envConfig = this.validateInput(process.env);
  }

  private validateInput(envConfig: Record<string, string>): Record<string, string> {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string().valid("local", "test", "development", "staging", "production").default("local"),
      PORT: Joi.number().default(3000),
      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.number().default(5432),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_NAME: Joi.string().required(),
      API_KEY_MAGNIFI: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig, {
      allowUnknown: true,
      abortEarly: false,
    });
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  getNumber(key: string): number {
    return Number(this.envConfig[key]);
  }
}
