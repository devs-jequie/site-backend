import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.integer('role_id').unsigned().references('role_id').inTable('roles').onDelete('CASCADE')

      table.string('name').notNullable()
      table.string('email').notNullable()
      table.string('password').notNullable()
      table.string('status').notNullable()

      table.string('image_url')
      table.string('nationality')
      table.string('postalCode')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
