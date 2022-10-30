import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cards'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id')
      table.string('holder')
      table.string('name')
      table.string('number').unique()
      table.string('cvc')
      table.string('due_date')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
