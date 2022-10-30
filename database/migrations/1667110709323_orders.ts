import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id')
      table.integer('product_id').unsigned().references('products.id')
      table.integer('card_id').unsigned().references('cards.id')
      table.integer('quantity')
      table.string('address')
      table.date('order_date')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
