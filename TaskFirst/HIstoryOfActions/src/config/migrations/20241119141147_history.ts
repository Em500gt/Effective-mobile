import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('actions', (table) => {
        table.increments('id').primary();
        table.string('shopId').notNullable();
        table.string('plu').notNullable();
        table.dateTime('action_date').notNullable();
        table.string('action').notNullable();
        table.json('details');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('actions');
} 