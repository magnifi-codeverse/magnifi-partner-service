import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CommonModule } from "./common/common.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnvService } from "./common/env.service";
import { LoggingMiddleware } from "./common/middleware/logger.middleware";
import { StreamModule } from './stream/stream.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [CommonModule],
      inject: [EnvService],
      useFactory: (envService: EnvService) => ({
        type: "postgres",
        host: envService.get("DB_HOST"),
        port: envService.getNumber("DB_PORT"),
        username: envService.get("DB_USERNAME"),
        password: envService.get("DB_PASSWORD"),
        database: envService.get("DB_NAME"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: true,
      }),
    }),

    CommonModule,

    StreamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes("*");
  }
}
