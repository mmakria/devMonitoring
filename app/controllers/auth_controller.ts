import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.create({ email, password })
    const token = User.accessTokens.create(user)

    return response.ok({
      user,
      token,
    })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)
      const token = await User.accessTokens.create(user)
      return response.ok({
        user,
        token,
      })
    } catch (error) {
      console.log(error)
      return response.forbidden({
        message: 'Email ou password invalide',
      })
    }
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    return response.noContent()
  }
}
