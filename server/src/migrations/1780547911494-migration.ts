import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1780547911494 implements MigrationInterface {
    name = 'Migration1780547911494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip" ALTER COLUMN "driverLoadDate" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip" ALTER COLUMN "driverLoadDate" SET NOT NULL`);
    }

}
