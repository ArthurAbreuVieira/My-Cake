import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name').notNullable()
      table.string('cpf').unique().notNullable();
      table.string('email').unique();
      table.string('password').notNullable();
      table.string('role', 8).defaultTo('customer').notNullable();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
