import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import TeamMember from 'App/Models/TeamMember'
import User from 'App/Models/User'


export default class TeamMembersController {
    public async store({request,response} : HttpContextContract) {
       
        const validarTeamMember = await schema.create({
          id: schema.string({trim:true},[rules.exists({table:'users' , column: 'id'})]),
          github_link: schema.string.optional({trim:true}, [rules.maxLength(45),rules.url({allowedHosts: ['github.com']})]),
          linkedin_link :	schema.string.optional({trim:true}, [rules.maxLength(45),rules.url({allowedHosts: ['linkedin.com']})]),
        })
        
        const playload  = await request.validate({ schema: validarTeamMember})
    
        const teamMember : TeamMember = await TeamMember.create(playload);

        return response.created(teamMember);
    }
}
