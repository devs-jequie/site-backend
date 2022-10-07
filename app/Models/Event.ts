import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import EventParticipant from './EventParticipant'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public event_id: number

  @column()
  public title: string

  @column()
  public description: string

  @column.date()
  public event_time: DateTime

  @column()
  public type: string

  @column()
  public locale: string

  @column()
  public image_url: string

  @column()
  public status: string

  @column()
  public duration: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public creator: BelongsTo<typeof User>

  @hasMany(() => EventParticipant)
  public event_participant: HasMany<typeof EventParticipant>
}
