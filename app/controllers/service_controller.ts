import { serviceValidation } from '#validators/service'
import type { HttpContext } from '@adonisjs/core/http'
import { create } from 'domain'

export default class ServiceController {
  async index({ auth, request, response }: HttpContext) {
    const page = await request.input('page')
    const services = await auth.user!.related('services').query().paginate(page, 10)
    return response.ok({
      services,
    })
  }

  async store({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(serviceValidation)
    const user = auth.getUserOrFail()

    try {
      const service = await user.related('services').create(payload)
      return response.created(service)
    } catch (error) {
      return response.internalServerError({
        message: 'une erreur est survenu lors de la création du service',
      })
    }
  }

  async destroy({ auth, response, params }: HttpContext) {
    const service = await auth
      .user!.related('services')
      .query()
      .where('id', params.id)
      .firstOrFail()

    await service.delete()
    return response.noContent()
  }
}
