import Ping from '#models/ping'
import type { HttpContext } from '@adonisjs/core/http'

export default class PingsController {
  // Time to first byte -> temps pour le premier octet
  async ttfbLatency({ auth, response, params }: HttpContext) {
    const user = auth.getUserOrFail()
    console.log('user id:', user.id)

    const service = await user
      .related('services')
      .query()
      .where('id', params.serviceId)
      .firstOrFail()

    const start = performance.now()
    const responseAim = await fetch(service.url, {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
    })
    const end = performance.now()
    const latency = end - start

    const ping = await Ping.create({
      statusCode: responseAim.status,
      serviceId: service.id,
      responseTime: latency,
    })

    return response.ok({
      data: `${latency} ms`,
      ping,
    })
  }
}
