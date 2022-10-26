import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import TeamMember from 'App/Models/TeamMember'
import {
  teamMemberServiceDestroy,
  teamMemberServiceGetById,
  teamMemberServiceListAll,
  teamMemberServiceStore,
  teamMemberServiceUpdate,
} from 'App/Services/TeamMemberService'

export default class TeamMembersController {
  public async store({ request, response }: HttpContextContract) {
    const validarTeamMember = schema.create({
      user_id: schema.string([
        rules.trim(),
        rules.exists({ table: 'users', column: 'id' }),
        rules.unique({ table: 'team_members', column: 'user_id' }),
      ]),
      github_link: schema.string.optional([
        rules.trim(),
        rules.maxLength(255),
        rules.url({ allowedHosts: ['github.com', 'www.github.com'] }),
      ]),
      linkedin_link: schema.string.optional([
        rules.trim(),
        rules.maxLength(255),
        rules.url({ allowedHosts: ['linkedin.com', 'www.linkedin.com'] }),
      ]),
    })
    const playload = await request.validate({ schema: validarTeamMember })
    try {
      const data = await teamMemberServiceStore(playload)

      if (!data) {
        return response.status(503).json({ message: 'Could not create Team Member' })
      }

      response.created(data)
    } catch (error) {
      response.status(500).json({ message: 'Server error, try again later' })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const validarTeamMember = schema.create({
      github_link: schema.string.optional([
        rules.trim(),
        rules.maxLength(255),
        rules.url({ allowedHosts: ['github.com', 'www.github.com'] }),
      ]),
      linkedin_link: schema.string.optional([
        rules.trim(),
        rules.maxLength(255),
        rules.url({ allowedHosts: ['www.linkedin.com', 'linkedin.com'] }),
      ]),
    })
    const playload = await request.validate({ schema: validarTeamMember })
    try {
      const { id } = params

      const data = await teamMemberServiceUpdate(id, playload?.github_link, playload?.linkedin_link)

      if (data === 404) return response.notFound({ message: 'Team Member not found' })
      if (!data) return response.status(503).json({ message: 'Could not update Team Member' })

      return response.ok(data)
    } catch (error) {
      response.status(500).json({ message: 'Server error, try again later' })
    }
  }

  public async show({ params, request, response }: HttpContextContract) {
    try {
      const { id } = params
      const { user } = request.qs()

      const data = await teamMemberServiceGetById(id, user === 'true')

      if (!data) {
        return response.notFound({ message: 'User Not Found' })
      }

      return response.ok(data)
    } catch (error) {
      response.status(500).json({ message: 'Server error, try again later' })
    }
  }

  public async index({ request, response }: HttpContextContract) {
    try {
      const { user } = request.qs()

      const data = await teamMemberServiceListAll(user === 'true')

      if (!data) {
        return response.notFound({ message: 'No User found' })
      }

      return response.ok(data)
    } catch (error) {
      response.status(500).json({ message: 'Server error, try again later' })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const { id } = params

      const result = await teamMemberServiceDestroy(id)

      if (!result) return response.notFound({ message: 'Team Member not found' })

      return response.ok({ message: 'Success! Team Member has been deleted' })
    } catch (error) {
      response.status(500).json({ message: 'Server error, try again later' })
    }
  }
}
