/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const ServicesController = () => import('#controllers/services_controller')
const PingsController = () => import('#controllers/pings_controller')
router
  .group(() => {
    // Authentification
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])

    router
      .group(() => {
        router.post('/logout', [AuthController, 'logout'])
        router.get('/services', [ServicesController, 'index'])
        router.delete('/services/:id', [ServicesController, 'destroy'])
        router.post('services', [ServicesController, 'store'])
        router.patch('services/:id', [ServicesController, 'update'])

        // pings
        router.post('/pings/services/:serviceId', [PingsController, 'ttfbLatency'])
        router.get('/pings/services/:serviceId', [PingsController, 'index'])
        router.get('/pings/services/:serviceId/pings/stats', [PingsController, 'statsLatency'])
      })
      .use(middleware.auth())
  })
  .prefix('/api')
