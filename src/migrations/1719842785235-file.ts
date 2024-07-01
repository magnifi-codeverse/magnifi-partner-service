import { MigrationInterface, QueryRunner } from "typeorm";

export class File1719842785235 implements MigrationInterface {
    name = 'File1719842785235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "partner_api_key" ("id" SERIAL NOT NULL, "partner_api_key_id" character varying(255) NOT NULL, "entity_id" character varying(255) NOT NULL, "user_id" character varying(255) NOT NULL, "organization_member_id" character varying(255) NOT NULL, "hashed_api_key" text NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a2e1b1eada30e9e129b904e1132" UNIQUE ("partner_api_key_id"), CONSTRAINT "PK_89fe73b6b8e43f5fbe4631ddc8b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "partner_api_key"`);
    }

}
