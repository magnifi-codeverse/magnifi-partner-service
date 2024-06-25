import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Partner } from "../entities/partner.entity";
import { IPartnerRepository } from "./partner.repository.interface";

@Injectable()
export class PartnerRepository implements IPartnerRepository {
  constructor(
    @InjectRepository(Partner)
    private readonly repo: Repository<Partner>,
  ) {}

  async findAll(): Promise<Partner[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<Partner | undefined> {
    return this.repo.findOneBy({ id });
  }

  async findByEntityId(entityId: string): Promise<Partner[] | undefined> {
    return this.repo.findBy({ entity_id: entityId });
  }

  async create(partnerData: Partial<Partner>): Promise<Partner> {
    const partner = this.repo.create(partnerData);
    return this.repo.save(partner);
  }

  async update(id: number, partnerData: Partial<Partner>): Promise<void> {
    await this.repo.update(id, partnerData);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async save(partner: Partner): Promise<Partner> {
    return this.repo.save(partner);
  }
}
