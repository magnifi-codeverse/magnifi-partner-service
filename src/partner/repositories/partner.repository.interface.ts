import { PartnerToken } from "../entities/partner.entity";

export interface IPartnerTokenRepository {
  findAll(): Promise<PartnerToken[]>;
  findById(id: number): Promise<PartnerToken | undefined>;
  findByEntityId(entityId: string): Promise<PartnerToken[] | undefined>;
  create(partnerData: Partial<PartnerToken>): Promise<PartnerToken>;
  update(id: number, partnerData: Partial<PartnerToken>): Promise<void>;
  delete(id: number): Promise<void>;
  save(partner: PartnerToken): Promise<PartnerToken>;
  findByPartnerTokenId(partnerTokenId: string): Promise<PartnerToken | undefined>;
}
