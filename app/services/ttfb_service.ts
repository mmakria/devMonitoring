export default class TffbService {

     try {
          const fetchResponse = await fetch(service.url, {
            method: 'GET',
            signal: AbortSignal.timeout(5000),
          })
          const end = performance.now()
          const latency = end - start
          const ping = await Ping.create({
            statusCode: fetchResponse.status,
            serviceId: service.id,
            responseTime: latency,
          })
          return response.ok({
            data: `${latency} ms`,
            ping,
          })
        } catch (error) {
          /*Scénario 1 — Timeout :
          Le serveur ne répond pas du tout. Le fetch attend 5 secondes puis échoue.
          → latency = 5000ms → tu sais que le serveur est lent/mort
          Scénario 2 — DNS introuvable :
          L'URL https://nimportequoi.xyz n'existe pas. Le fetch échoue instantanément.
          → latency = 12ms → tu sais que l'URL est invalide*/
    
          const latency = performance.now() - start
          await Ping.create({
            statusCode: 0, // car pas le fetch echoue et donc pas de status code ex: 404, 200 ...
            serviceId: service.id,
            responseTime: latency,
            errorMessage: error instanceof Error ? error.message : 'Unknown error',
          })
          return response.serviceUnavailable({ data: 'Service unreachable' })
        }
}
