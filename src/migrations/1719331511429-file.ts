import { MigrationInterface, QueryRunner } from "typeorm";

export class File1719331511429 implements MigrationInterface {
    name = 'File1719331511429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "partner_token" ("id" SERIAL NOT NULL, "partner_token_id" character varying(255) NOT NULL, "entity_id" character varying(255) NOT NULL, "user_id" character varying(255) NOT NULL, "name" character varying(255) NOT NULL, "scope" character varying(255) NOT NULL, "client_jwt_hash" text NOT NULL, "partner_jwt" text NOT NULL, "is_revoked" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d9c3077e30e5ea4e78f0ebade75" UNIQUE ("partner_token_id"), CONSTRAINT "PK_c8cfcbb13da98ff62ade86f5585" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_REVOKED_FALSE" ON "partner_token" ("is_revoked") WHERE is_revoked = false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_REVOKED_FALSE"`);
        await queryRunner.query(`DROP TABLE "partner_token"`);
    }

}
