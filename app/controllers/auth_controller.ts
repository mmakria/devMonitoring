import User from '#models/user'
import { loginValidation, registerValidation } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(registerValidation)

    try {
      const user = await User.create({ email, password })
      const token = await User.accessTokens.create(user)

      return response.created({
        user,
        token,
      })
    } catch (error) {
      console.log(error)
      if (error.code === '23505') {
        return response.conflict({ message: 'cette adresse mail est déja utilisé' })
      }
      return response.internalServerError({ message: 'Erreur serveur' })
    }
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidation)

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
