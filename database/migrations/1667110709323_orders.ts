import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').notNullable()
      table.integer('product_id').unsigned().references('products.id').notNullable()
      table.integer('card_id').unsigned().references('cards.id').notNullable()
      table.integer('quantity').notNullable()
      table.string('address').notNullable()
      table.date('order_date').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
