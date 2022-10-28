import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name').unique();
      table.string('email');
      table.string('password');
      table.string('role').defaultTo('customer');
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
