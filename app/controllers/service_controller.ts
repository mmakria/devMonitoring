import type { HttpContext } from '@adonisjs/core/http'

export default class ServiceController {
  async index({ auth, request, response }: HttpContext) {
    const page = await request.input('page')
    const services = await auth.user!.related('services').query().paginate(page, 10)
    return response.ok({
      services,
    })
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
