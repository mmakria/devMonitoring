import type { HttpContext } from '@adonisjs/core/http'

export default class ServicesController {
  async index({ response }: HttpContext) {
    return response.noContent()
  }
}
