import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1781057765353 implements MigrationInterface {
    name = 'Migration1781057765353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ADD "managerId" uuid`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_71423a7db3ba5fa86c0f29e00eb" FOREIGN KEY ("managerId") REFERENCES "manager"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_71423a7db3ba5fa86c0f29e00eb"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "managerId"`);
    }

}
