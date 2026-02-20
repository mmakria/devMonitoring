import User from '#models/user'
import { loginValidation, registerValidation } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async profile({ auth, response }: HttpContext) {
    return response.ok({ user: auth.user })
  }

  async register({ request, response }: HttpContext) {
    const { fullName, email, password } = await request.validateUsing(registerValidation)

    try {
      const user = await User.create({ fullName, email, password })
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

      // Setter le cookie httpOnly dans la réponse HTTP
      response.cookie('token', token.value, {
        httpOnly: true, // JS du navigateur ne peut PAS le lire
        secure: false, //http et non https
        sameSite: 'lax', // pas envoyé sur des requêtes cross-site
        maxAge: 60 * 60 * 24 * 7, // 7 jours
      })

      return response.ok({
        user,
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

    response.clearCookie('token')
    return response.noContent()
  }
}
