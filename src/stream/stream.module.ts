import { Module } from "@nestjs/common";
import { StreamController } from "./stream.controller";
import { StreamService } from "./stream.service";
import { CommonModule } from "src/common/common.module";

@Module({
  imports: [CommonModule],
  controllers: [StreamController],
  providers: [StreamService],
})
export class StreamModule {}
