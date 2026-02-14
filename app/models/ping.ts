import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Service from '#models/service'

export default class Ping extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare serviceId: number

  @column()
  declare statusCode: number

  @column()
  declare responseTime: number

  @column()
  declare errorMessage: string | null

  @belongsTo(() => Service)
  declare service: BelongsTo<typeof Service>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
