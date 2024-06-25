import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CommonModule } from "./common/common.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnvService } from "./common/env.service";
import { LoggingMiddleware } from "./common/middleware/logger.middleware";
import { StreamModule } from "./stream/stream.module";
import { AuthModule } from "./auth/auth.module";
import { PartnerModule } from "./partner/partner.module";
import typeorm from "./config/typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.get("typeorm"),
    }),

    CommonModule,

    StreamModule,

    AuthModule,

    PartnerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes("*");
  }
}
