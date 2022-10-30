// import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Card from './Card'
import Product from './Product'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public role: string

  @column()
  public cpf: string;

  @manyToMany(() => Product, {
    pivotTable: "orders"
  })
  public products: ManyToMany<typeof Product>

  @hasMany(() => Card,{
    foreignKey: 'user_id'
  })
  public cards: HasMany<typeof Card>
}
