import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import {
  userServiceDestroy,
  userServiceGetById,
  userServiceListAll,
  userServiceStore,
  userServiceUpdate,
} from 'App/Services/UserService'

export default class UsersController {
  public async me({ auth, request, response }: HttpContextContract) {
    try {
      const user = await User.query().where('id', auth.user['id']).preload('role')

      return response.ok({ user })
    } catch (error) {}
  }
  public async index({ request, response }: HttpContextContract) {
    try {
      const { role } = request.qs()

      const data = await userServiceListAll(role === 'true')

      if (!data) {
        response.status(503).json({ message: 'Unable to perform users search' })
      }
      return response.ok(data)
    } catch (error) {
      return response.status(500).json({ message: 'Server error, try again later' })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const createUserSchema = schema.create({
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
    const payload = await request.validate({ schema: createUserSchema })
    try {
      const data = await userServiceStore(payload)

      if (!data) {
        return response.status(503).json({ message: 'Could not create user' })
      }
      return response.created(data)
    } catch (error) {
      return response.status(500).json({ message: 'Server error, try again later' })
    }
  }

  public async show({ params, request, response }: HttpContextContract) {
    try {
      const { id } = params
      const { role } = request.qs()

      const data = await userServiceGetById(id, role === 'true')

      if (!data) {
        return response.notFound({ message: 'User not found' })
      }

      return response.ok(data)
    } catch (error) {
      return response.status(500).json({ message: 'Server error, try again later' })
    }
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
    const payload = await request.validate({ schema: updateUserSchema })
    try {
      const { id } = params
      const data = await userServiceUpdate(id, payload)
      if (data === 404) {
        return response.notFound({ message: 'User not found' })
      }
      if (!data) return response.status(503).json({ message: 'Could not update user' })
      return response.ok(data)
    } catch (error) {
      response.status(500).json({ message: 'Server error, try again later' })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const { id } = params
      const data = userServiceDestroy(id)

      if (!data) {
        return response.notFound({ message: 'User not found' })
      }

      return response.ok({ message: 'Success! User has been deleted' })
    } catch (error) {
      response.status(500).json({ message: 'Server error, try again later' })
    }
  }
}
