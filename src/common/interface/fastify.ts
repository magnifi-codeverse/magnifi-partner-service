import { FastifyRequest } from "fastify";

export interface JwtClientUser {
  userId: string;
  name: string;
  scope: string;
  jwt_token: string;
}

export interface FastifyRequestWithJwtClientUser extends FastifyRequest {
  user?: JwtClientUser;
}

export interface JwtPartnerUser {
  userId: string;
  entity_id: string;
  partner_token_id: string;
}

export interface FastifyRequestWithJwtPartnerUser extends FastifyRequest {
  user?: JwtPartnerUser;
}
