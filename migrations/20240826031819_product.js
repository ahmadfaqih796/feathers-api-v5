export async function up(knex) {
  await knex.schema.createTable('product', (table) => {
    table.increments('id')
    table.string('n_product')
    table.string('description')
    table.integer('price')
    table.integer('stock')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  await knex.schema.dropTable('product')
}
