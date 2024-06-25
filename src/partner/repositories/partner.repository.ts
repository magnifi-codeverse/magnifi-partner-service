import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PartnerToken } from "../entities/partner.entity";
import { IPartnerTokenRepository } from "./partner.repository.interface";

@Injectable()
export class PartnerTokenRepository implements IPartnerTokenRepository {
  constructor(
    @InjectRepository(PartnerToken)
    private readonly repo: Repository<PartnerToken>,
  ) {}

  async findAll(): Promise<PartnerToken[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<PartnerToken | undefined> {
    return this.repo.findOneBy({ id });
  }

  async findByEntityId(entityId: string): Promise<PartnerToken[] | undefined> {
    return this.repo.findBy({ entity_id: entityId });
  }

  async findByEntityIdUnRevoked(entityId: string): Promise<PartnerToken[] | undefined> {
    return this.repo.findBy({ entity_id: entityId, is_revoked: false });
  }

  async create(partnerData: Partial<PartnerToken>): Promise<PartnerToken> {
    const partner = this.repo.create(partnerData);
    return this.repo.save(partner);
  }

  async update(id: number, partnerData: Partial<PartnerToken>): Promise<void> {
    await this.repo.update(id, partnerData);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async save(partner: PartnerToken): Promise<PartnerToken> {
    return this.repo.save(partner);
  }
}
