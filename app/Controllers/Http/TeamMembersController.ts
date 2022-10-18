import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import TeamMember from 'App/Models/TeamMember'

export default class TeamMembersController {
  public async store({ request, response }: HttpContextContract) {
    const validarTeamMember = schema.create({
      id: schema.string([rules.trim(), rules.exists({ table: 'users', column: 'id' })]),
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

    const teamMember: TeamMember = await TeamMember.create(playload)

    return response.created(teamMember)
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

    const teamMember = await TeamMember.find(params.id)

    if (!teamMember) return response.notFound({ message: 'Team Member not found' })

    const playload = await request.validate({ schema: validarTeamMember })

    await teamMember
      .merge({ github_link: playload?.github_link, linkedin_link: playload?.linkedin_link })
      .save()

    return response.ok(teamMember)
  }

  public async show({ params, response }: HttpContextContract) {

    const teamMember = await TeamMember.find(params.id)

    if (!teamMember) return response.notFound({ message: 'Team Member not found' })

    return response.ok(teamMember)
  }

  public async list({ response }: HttpContextContract) {

    const teamMember = await TeamMember.all()

    return response.ok(teamMember)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const teamMember = await TeamMember.find(params.id)

    if (!teamMember) return response.notFound({ message: 'Team Member not found' })

    teamMember.delete()

    return response.ok({ message: 'Success! Team Member has been deleted' })
  }
}
