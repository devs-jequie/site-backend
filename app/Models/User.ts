import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  BaseModel,
  column,
  BelongsTo,
  belongsTo,
  beforeSave,
  beforeCreate,
  manyToMany,
  ManyToMany,
  hasMany,
  HasMany,
  hasOne,
  HasOne,
} from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import OccupationArea from './OccupationArea'
import Event from './Event'
import EventParticipant from './EventParticipant'
import TeamMember from './TeamMember'
import Content from './Content'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public status: string

  @column()
  public image_url: string

  @column()
  public nationality: string

  @column()
  public postalCode: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>

  @hasOne(() => Content)
  public content: HasOne<typeof Content>

  @hasOne(() => TeamMember)
  public team_member: HasOne<typeof TeamMember>

  @hasMany(() => EventParticipant)
  public event_participant: HasMany<typeof EventParticipant>

  @hasMany(() => Event)
  public events: HasMany<typeof Event>

  @manyToMany(() => OccupationArea)
  public occupation_area: ManyToMany<typeof OccupationArea>

  @beforeCreate()
  public static async createUUID(user: User) {
    if (user.id === undefined) {
      user.id = uuidv4()
    }
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
