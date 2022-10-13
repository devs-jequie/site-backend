import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async () => {return {hello:'world'}})

  Route.post('/logout', 'AuthController.logout')
}).middleware('auth:web,api').prefix('api')

Route.post('login', 'AuthController.store').prefix('api')
