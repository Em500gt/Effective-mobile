import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        private readonly dataSource: DataSource
    ) { }

    async resetProblemsFlag(): Promise<number> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();

        try {
            const result = await queryRunner.query(`
            WITH updated AS (
              UPDATE users
              SET problems = false
              WHERE problems = true
              RETURNING id
            )
            SELECT COUNT(*) AS count FROM updated;
          `);

            return parseInt(result[0]?.count, 10) || 0;
        } catch (error) {
            console.error('Error during resetProblemsAndCount:', error);
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}
