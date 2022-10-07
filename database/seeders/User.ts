import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { v4 as uuidv4 } from 'uuid'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        id: uuidv4(),
        email: 'virk@adonisjs.com',
        password: 'secret',
        name: 'virk',
        status: 'active',
      },
      {
        id: uuidv4(),
        email: 'romain@adonisjs.com',
        password: 'supersecret',
        name: 'romain',
        status: 'active',
      },
    ])
  }
}
