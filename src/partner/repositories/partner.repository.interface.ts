import { Partner } from "../entities/partner.entity";

export interface IPartnerRepository {
  findAll(): Promise<Partner[]>;
  findById(id: number): Promise<Partner | undefined>;
  findByEntityId(entityId: string): Promise<Partner[] | undefined>;
  create(partnerData: Partial<Partner>): Promise<Partner>;
  update(id: number, partnerData: Partial<Partner>): Promise<void>;
  delete(id: number): Promise<void>;
  save(partner: Partner): Promise<Partner>;
}
