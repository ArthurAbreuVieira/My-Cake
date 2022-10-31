import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cards'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').notNullable()
      table.string('holder').notNullable()
      table.string('name').notNullable()
      table.string('number').unique().notNullable()
      table.string('cvc', 3).notNullable()
      table.string('due_date', 5).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
