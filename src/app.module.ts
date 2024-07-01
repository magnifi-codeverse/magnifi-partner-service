import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CommonModule } from "./common/common.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggingMiddleware } from "./common/middlewares/logger.middleware";
import { StreamModule } from "./stream/stream.module";
import { AuthModule } from "./auth/auth.module";
import { PartnerModule } from "./partner/partner.module";
import typeorm from "./config/typeorm";
import { RequestIdMiddleware } from "./common/middlewares/request-id.middleware";

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
    consumer.apply(RequestIdMiddleware).forRoutes("*");
    consumer.apply(LoggingMiddleware).forRoutes("*");
  }
}
