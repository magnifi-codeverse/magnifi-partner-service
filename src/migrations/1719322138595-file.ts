import { MigrationInterface, QueryRunner } from "typeorm";

export class File1719322138595 implements MigrationInterface {
    name = 'File1719322138595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "partner" ("id" SERIAL NOT NULL, "entity_id" character varying(255) NOT NULL, "user_id" character varying(255) NOT NULL, "token" text NOT NULL, "issued_at" TIMESTAMP NOT NULL, "expire_at" TIMESTAMP NOT NULL, "name" character varying(255) NOT NULL, "scope" character varying(255) NOT NULL, "revoked" boolean NOT NULL DEFAULT false, "creation_date" TIMESTAMP NOT NULL DEFAULT now(), "expiration_date" TIMESTAMP, CONSTRAINT "PK_8f34ff11ddd5459eacbfacd48ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_REVOKED_FALSE" ON "partner" ("revoked") WHERE revoked = FALSE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_REVOKED_FALSE"`);
        await queryRunner.query(`DROP TABLE "partner"`);
    }

}
