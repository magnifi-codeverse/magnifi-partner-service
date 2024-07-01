import { PartnerApiKey } from "../entities/partner.entity";

export interface IPartnerApiKeyRepository {
  findAll(): Promise<PartnerApiKey[]>;
  findOneBy(where: Partial<PartnerApiKey>): Promise<PartnerApiKey | undefined>;
  findById(id: number): Promise<PartnerApiKey | undefined>;
  findByEntityId(entityId: string): Promise<PartnerApiKey[] | undefined>;
  findByEntityIdActive(entityId: string): Promise<PartnerApiKey[] | undefined>;
  create(partnerData: Partial<PartnerApiKey>): Promise<PartnerApiKey>;
  update(id: number, partnerData: Partial<PartnerApiKey>): Promise<void>;
  delete(id: number): Promise<void>;
  deleteByPartnerApiKeyId(partnerApiKeyId: string): Promise<void>;
  save(partner: PartnerApiKey): Promise<PartnerApiKey>;
  findByPartnerApiKeyId(partnerApiKeyId: string): Promise<PartnerApiKey | undefined>;
}
