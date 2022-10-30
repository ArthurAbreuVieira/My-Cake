import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Card from './Card'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public product_id: number

  @column()
  public card_id: number

  @column()
  public address: string

  @column()
  public quantity: number

  @column.date()
  public order_date: DateTime
 
  @belongsTo(() => Product, {
    foreignKey: 'product_id'
  })
  public product: BelongsTo<typeof Product>
  
  @belongsTo(() => Card, {
    foreignKey: 'card_id'
  })
  public card: BelongsTo<typeof Card>
  
}
