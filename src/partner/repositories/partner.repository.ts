import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PartnerApiKey } from "../entities/partner.entity";
import { IPartnerApiKeyRepository } from "./partner.repository.interface";

@Injectable()
export class PartnerApiKeyRepository implements IPartnerApiKeyRepository {
  constructor(
    @InjectRepository(PartnerApiKey)
    private readonly repo: Repository<PartnerApiKey>,
  ) {}

  async findAll(): Promise<PartnerApiKey[]> {
    return this.repo.find();
  }

  async findOneBy(where: Partial<PartnerApiKey>): Promise<PartnerApiKey | undefined> {
    return this.repo.findOne({ where });
  }

  async findById(id: number): Promise<PartnerApiKey | undefined> {
    return this.repo.findOneBy({ id });
  }

  async findByEntityId(entityId: string): Promise<PartnerApiKey[] | undefined> {
    return this.repo.findBy({ entity_id: entityId });
  }

  async findByEntityIdActive(entityId: string): Promise<PartnerApiKey[] | undefined> {
    return this.repo.findBy({ entity_id: entityId, is_active: true });
  }

  async create(partnerData: Partial<PartnerApiKey>): Promise<PartnerApiKey> {
    const partner = this.repo.create(partnerData);
    return this.repo.save(partner);
  }

  async update(id: number, partnerData: Partial<PartnerApiKey>): Promise<void> {
    await this.repo.update(id, partnerData);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async deleteByPartnerApiKeyId(partnerApiKeyId: string): Promise<void> {
    await this.repo.delete({ partner_api_key_id: partnerApiKeyId });
  }

  async save(partner: PartnerApiKey): Promise<PartnerApiKey> {
    return this.repo.save(partner);
  }

  async findByPartnerApiKeyId(partnerApiKeyId: string): Promise<PartnerApiKey | undefined> {
    return this.repo.findOneBy({ partner_api_key_id: partnerApiKeyId });
  }
}
