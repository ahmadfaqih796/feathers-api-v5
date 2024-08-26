export async function up(knex) {
  await knex.schema.createTable('categories', (table) => {
    table.increments('id')
    table.string('n_category')
    table.string('description')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  await knex.schema.dropTable('categories')
}
