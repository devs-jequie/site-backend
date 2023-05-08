import User from 'App/Models/User'

interface UserObject {
  roleId?: number | undefined
  name: string
  email: string
  password: string
  status?: string | undefined
  image_url: string | undefined
  nationality: string | undefined
  postalCode: string | undefined
}
export async function userServiceStore(userObject: UserObject) {
  try {
    userObject.status = 'active'
    userObject.roleId = 2
    const user: User = await User.create(userObject)

    return user
  } catch (error) {
    false
  }
}

export async function userServiceUpdate(id: string, userObject: Partial<UserObject>) {
  try {
    const user = await User.find(id)

    if (!user) return 404

    await user.merge(userObject).save()
    return user
  } catch (error) {
    return false
  }
}

export async function userServiceListAll(role: Boolean) {
  try {
    if (role) {
      return await User.query().where('status', 'active').preload('role')
    } else {
      return await User.query().where('status', 'active')
    }
  } catch (error) {
    return false
  }
}

export async function userServiceGetById(id: string, role: boolean) {
  try {
    const user = await User.findOrFail(id)

    if (role) await user.load('role')

    return user
  } catch (error) {
    return false
  }
}

export async function userServiceDestroy(id: string) {
  try {
    const user = await User.findOrFail(id)

    user.status = 'inactive'
    await user.save()

    return true
  } catch (error) {
    return false
  }
}
