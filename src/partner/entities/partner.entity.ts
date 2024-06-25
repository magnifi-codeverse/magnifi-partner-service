import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
@Index("IDX_REVOKED_FALSE", ["is_revoked"], { where: "is_revoked = false" })
export class PartnerToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, unique: true })
  partner_token_id: string;

  @Column({ type: "varchar", length: 255 })
  entity_id: string;

  @Column({ type: "varchar", length: 255 })
  user_id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  scope: string;

  @Column({ type: "text" })
  client_jwt_hash: string;

  @Column({ type: "text" })
  partner_jwt: string;

  @Column({ type: "boolean", default: false })
  is_revoked: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
