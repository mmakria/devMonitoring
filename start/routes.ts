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
const ServiceController = () => import('#controllers/service_controller')
router
  .group(() => {
    // Authentification
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])

    router
      .group(() => {
        router.post('/logout', [AuthController, 'logout'])
        router.get('/services', [ServiceController, 'index'])
        router.delete('/services/:id', [ServiceController, 'destroy'])
        router.post('services', [ServiceController, 'store'])
        router.patch('services/:id', [ServiceController, 'update'])
      })
      .use(middleware.auth())
  })
  .prefix('/api')
