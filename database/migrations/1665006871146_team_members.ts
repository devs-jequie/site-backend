import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TeamMemberSchema extends BaseSchema {
  protected tableName = 'team_members'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')

      table.string('github_link')
      table.string('linkedin_link')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
