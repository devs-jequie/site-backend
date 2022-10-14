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
      .where('status', '=', 'active')
    return response.ok({ users })
  }

  public async store({ request, response }: HttpContextContract) {
    const createUserSchema = await schema.create({
      name: schema.string({ trim: true }, [rules.maxLength(50)]),
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
    const payload: any = await request.validate({ schema: createUserSchema })
    payload.status = 'active'
    payload.roleId = 2
    const user: User = await User.create(payload)
    return response.created(user)
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params

    const user = await User.query()
      .select('users.name')
      .select('users.email')
      .select('users.status')
      .select('users.nationality')
      .select('users.postal_code')
      .where('id', '=', id)

    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    return response.ok(user)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const updateUserSchema = await schema.create({
      name: schema.string.optional({ trim: true }, [rules.maxLength(50)]),
      email: schema.string.optional({ trim: true }, [rules.email()]),
      password: schema.string.optional({ trim: true }, [
        rules.confirmed(),
        rules.minLength(8),
        rules.maxLength(32),
      ]),
      image_url: schema.string.optional({ trim: true }),
      nationality: schema.string.optional({ trim: true }),
      postalCode: schema.string.optional({ trim: true }),
    })
    const payload: any = await request.validate({ schema: updateUserSchema })
    const { id } = params
    const user = await User.find(id)
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }
    user.name = payload?.name
    user.email = payload?.email
    user.password = payload?.password
    user.image_url = payload?.image_url
    user.nationality = payload?.nationality
    user.postalCode = payload?.postalCode

    await user.save()

    return response.ok(user)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params
    const user = await User.find(id)
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }
    user.status = 'inactive'
    await user.save()

    return response.ok({ message: 'Success! User has been deleted' })
  }
}
