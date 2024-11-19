import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1731946314533 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            firstName VARCHAR(255) NOT NULL,
            lastName VARCHAR(255) NOT NULL,
            age INT NOT NULL,
            gender VARCHAR(50) NOT NULL,
            problems BOOLEAN DEFAULT false
          );
        `);

    const batchSize = 100000;
    const totalUsers = 1000000;
    const users = Array.from({ length: totalUsers }, (_, i) => {
      const gender = i % 2 === 0 ? 'male' : 'female';
      const hasProblems = i % 3 === 0;
      return `('${`Name${i}`}', '${`Surname${i}`}', ${20 + (i % 30)}, '${gender}', ${hasProblems})`;
    });

    for (let i = 0; i < users.length; i += batchSize) {
      const chunk = users.slice(i, i + batchSize).join(',');
      await queryRunner.query(`
            INSERT INTO users (firstName, lastName, age, gender, problems)
            VALUES ${chunk};
          `);
    }

    await queryRunner.query(`CREATE INDEX idxUsersProblems ON users (problems)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users`);
  }
}
