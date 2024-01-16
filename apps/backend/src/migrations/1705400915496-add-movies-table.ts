import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMoviesTable1705400915496 implements MigrationInterface {
  name = 'AddMoviesTable1705400915496';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "movies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "publishing_year" integer NOT NULL, "image_uri" character varying NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies" ADD CONSTRAINT "FK_b16396310081b89594a4f2f2890" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movies" DROP CONSTRAINT "FK_b16396310081b89594a4f2f2890"`,
    );
    await queryRunner.query(`DROP TABLE "movies"`);
  }
}
