import type { HttpContext } from '@adonisjs/core/http'

export default class ServiceController {
  async index({ auth, request, response }: HttpContext) {
    const page = await request.input('page')
    const services = await auth.user!.related('services').query().paginate(page, 10)
    return response.ok({
      services,
    })
  }
}
