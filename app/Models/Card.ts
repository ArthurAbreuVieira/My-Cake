import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'
import User from './User'

export default class Card extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public name: string

  @column()
  public holder: string

  @column()
  public number: string

  @column()
  public cvc: string

  @column()
  public due_date: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Order, {
    foreignKey: 'card_id'
  })
  public orders: HasMany<typeof Order>
}
