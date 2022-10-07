import { DateTime } from 'luxon'
import { BaseModel, column, HasManyThrough, hasManyThrough } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Event from './Event'

export default class EventParticipant extends BaseModel {
  @column()
  public is_voicer: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasManyThrough([() => User, () => Event])
  public participant: HasManyThrough<typeof User>
}
