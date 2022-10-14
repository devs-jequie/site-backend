import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EventsSchema extends BaseSchema {
  protected tableName = 'events'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.uuid('creator_id').references('id').inTable('users').onDelete('CASCADE')

      table.string('title').notNullable()
      table.text('description').notNullable()
      table.date('event_time').notNullable()
      table.string('type').notNullable()
      table.string('locale').notNullable()
      table.string('image_url').notNullable()
      table.string('status').notNullable()
      table.string('duration').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
