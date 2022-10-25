import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {
  public async store({ auth, request, response }: HttpContextContract) {
    const validateLogin = schema.create({
      email: schema.string({ trim: true }, [rules.email()]),
      password: schema.string([rules.maxLength(32)]),
    })

    await request.validate({ schema: validateLogin })

    const email = request.input('email')
    const password = request.input('password')

    const user = await User.query().where('email', email).firstOrFail()

    if (!(await Hash.verify(user.password, password))) {
      return response.unauthorized('Invalid credentials')
    }

    const token = await auth.use('api').generate(user)

    return token
  }

  public async logout({ auth, response }) {
    await auth.use('api').logout()

    if (auth.use('api').isLoggedOut) {
      response.status(200).send({ message: 'User disconnected' })
    } else {
      response.status(400).send({ error: 'Unable to disconnect user' })

    }
  }
}
