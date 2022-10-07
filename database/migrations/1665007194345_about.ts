import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AboutSchema extends BaseSchema {
  protected tableName = 'about'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('about_id').primary()

      table.string('hero_background_image_link').notNullable()
      table.string('hero_title').notNullable()
      table.string('hero_description').notNullable()
      table.string('hero_link').notNullable()
      table.text('about_text').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
