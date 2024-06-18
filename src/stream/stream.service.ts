import { Injectable } from "@nestjs/common";

@Injectable()
export class StreamService {
  async getStreamData() {
    return { message: "In progress..." };
  }

  async createStream(createStreamDto) {
    return { message: "In progress...", ...createStreamDto };
  }
}
