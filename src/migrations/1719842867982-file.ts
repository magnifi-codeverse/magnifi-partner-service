import { MigrationInterface, QueryRunner } from "typeorm";

export class File1719842867982 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE UNIQUE INDEX unique_active_entity_id
            ON partner_api_key (entity_id)
            WHERE is_active = true;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX unique_active_entity_id;
        `);
  }
}
