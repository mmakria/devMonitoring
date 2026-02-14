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
}
