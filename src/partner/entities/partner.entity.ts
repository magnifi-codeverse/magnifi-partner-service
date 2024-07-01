import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from "typeorm";

// A custom migration script (File1719842867982) added the unique constraint "unique_active_entity_id" to ensure
// only one active partner API key exists per entity; since TypeORM doesn't support partial indexes
// programmatically, we added the @Index decorator for the unique_active_entity_id to prevent TypeORM from generating a migration script to
// drop the constraint.
@Entity()
@Index("unique_active_entity_id", ["entity_id"], { unique: true, where: "is_active = true" })
export class PartnerApiKey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, unique: true })
  partner_api_key_id: string;

  @Column({ type: "varchar", length: 255 })
  entity_id: string;

  @Column({ type: "varchar", length: 255 })
  user_id: string;

  @Column({ type: "varchar", length: 255 })
  organization_member_id: string;

  @Column({ type: "text" })
  hashed_api_key: string;

  @Column({ type: "boolean", default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
