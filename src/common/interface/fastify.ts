import { FastifyRequest } from "fastify";

export interface JwtClientUser {
  userId: string;
  name: string;
  scope: string;
  issuedAt: number;
  expireAt: number;
}

export interface FastifyRequestWithJwtClientUser extends FastifyRequest {
  user?: JwtClientUser;
}
