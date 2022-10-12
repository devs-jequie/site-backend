import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EventParticipantsSchema extends BaseSchema {
  protected tableName = 'event_participants'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('user_id').references('id').inTable('users')
      table.integer('event_id').references('id').inTable('events')

      table.boolean('is_voicer')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
