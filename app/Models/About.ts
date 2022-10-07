import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class About extends BaseModel {
  @column({ isPrimary: true })
  public about_id: number

  @column()
  public hero_background_image_link: string

  @column()
  public hero_title: string

  @column()
  public hero_description: string

  @column()
  public hero_link: string

  @column()
  public about_text: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
