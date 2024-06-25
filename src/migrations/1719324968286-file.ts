import { MigrationInterface, QueryRunner } from "typeorm";

export class File1719324968286 implements MigrationInterface {
    name = 'File1719324968286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "partner" DROP COLUMN "issued_at"`);
        await queryRunner.query(`ALTER TABLE "partner" ADD "issued_at" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "partner" DROP COLUMN "expire_at"`);
        await queryRunner.query(`ALTER TABLE "partner" ADD "expire_at" bigint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "partner" DROP COLUMN "expire_at"`);
        await queryRunner.query(`ALTER TABLE "partner" ADD "expire_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "partner" DROP COLUMN "issued_at"`);
        await queryRunner.query(`ALTER TABLE "partner" ADD "issued_at" TIMESTAMP NOT NULL`);
    }

}
