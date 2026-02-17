import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Ping from '#models/ping'
import User from '#models/user'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare userId: number
  @column()
  declare name: string
  @column()
  declare url: string
  @column()
  declare isActive: boolean

  @hasMany(() => Ping)
  declare pings: HasMany<typeof Ping>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
