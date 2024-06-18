import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { FastifyReply } from "fastify";
import { StreamService } from "./stream.service";
import { CreateStreamDto } from "./dto/create-stream.dto";
import { LoggerService } from "src/common/logger.service";

@Controller({
  path: "stream",
  version: "1",
})
export class StreamController {
  constructor(
    private readonly streamService: StreamService,
    private readonly logger: LoggerService,
  ) {}

  @Get()
  async getStream(@Res() res: FastifyReply) {
    const data = await this.streamService.getStreamData();
    res.status(202).send({
      statusCode: 202,
      message: "This is building",
      data: data,
    });
  }

  @Post()
  async createStream(@Body() createStreamDto: CreateStreamDto, @Res() res: FastifyReply) {
    const data = await this.streamService.createStream(createStreamDto);
    this.logger.log("Stream created", { context: data });

    res.status(HttpStatus.ACCEPTED).send({
      statusCode: HttpStatus.ACCEPTED,
      message: "This is building",
      data: data,
    });
  }
}
