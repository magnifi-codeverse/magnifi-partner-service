import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity()
export class Partner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  entity_id: string;

  @Column({ type: "varchar", length: 255 })
  user_id: string;

  @Column({ type: "text" })
  token: string;

  @Column({ type: "bigint" })
  issued_at: number;

  @Column({ type: "bigint" })
  expire_at: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  scope: string;

  @Column({ type: "boolean", default: false })
  @Index("IDX_REVOKED_FALSE", { where: "revoked = FALSE" })
  revoked: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  creation_date: Date;

  @Column({ type: "timestamp", nullable: true })
  expiration_date: Date;
}
