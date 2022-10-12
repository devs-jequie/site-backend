import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const users = await Database.from('users')
      .join('roles', 'users.role_id', '=', 'roles.id')
      .select('roles.role_name')
      .select('users.name')
      .select('users.email')
      .select('users.status')
      .select('users.nationality')
      .select('users.postal_code')
    return response.ok({ users })
  }

  public async store({ request, response }: HttpContextContract) {
    const userSchema = await schema.create({
      name: schema.string({ trim: true }, [rules.maxLength(255)]),
      email: schema.string({ trim: true }, [rules.email()]),
      password: schema.string({ trim: true }, [
        rules.confirmed(),
        rules.minLength(8),
        rules.maxLength(32),
      ]),
      image_url: schema.string.optional({ trim: true }),
      nationality: schema.string.optional({ trim: true }),
      postalCode: schema.string({ trim: true }),
    })
    let payload: any = await request.validate({ schema: userSchema })
    payload.status = 'active'
    payload.roleId = 2
    const user: User = await User.create(payload)
    return response.created(user)
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
