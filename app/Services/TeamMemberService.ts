import TeamMember from 'App/Models/TeamMember'

export async function teamMemberServiceStore({ user_id, github_link, linkedin_link }) {
  try {
    const teamMember: TeamMember = await TeamMember.create({
      userId: user_id,
      github_link,
      linkedin_link,
    })
    return teamMember
  } catch (error) {
    return false
  }
}
export async function teamMemberServiceUpdate(
  user_id: string,
  github_link: string | undefined,
  linkedin_link: string | undefined
) {
  try {
    const teamMember = await TeamMember.find(user_id)

    if (!teamMember) return 404

    await teamMember.merge({ github_link, linkedin_link }).save()
    return teamMember
  } catch (error) {
    return false
  }
}

export async function teamMemberServiceGetById(id: String, user: Boolean) {
  try {
    const teamMember = await TeamMember.findOrFail(id)

    if (user) await teamMember.load('user')

    return teamMember
  } catch (error) {
    return false
  }
}

export async function teamMemberServiceListAll(user: Boolean) {
  try {
    if (user) {
      return await TeamMember.query().preload('user')
    } else {
      return await TeamMember.query()
    }
  } catch (error) {
    return false
  }
}

export async function teamMemberServiceDestroy(id: String) {
  try {
    const teamMember = await TeamMember.findOrFail(id)

    teamMember.delete()

    if (teamMember.$isDeleted) return true
  } catch (error) {
    return false
  }
}
