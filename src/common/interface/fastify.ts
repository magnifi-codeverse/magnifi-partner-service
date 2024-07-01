import { FastifyRequest } from "fastify";

export interface JwtPartnerUser {
  userId: string;
  entity_id: string;
  partner_token_id: string;
}

export interface FastifyRequestWithJwtPartnerUser extends FastifyRequest {
  user?: JwtPartnerUser;
}
