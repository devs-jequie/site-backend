import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async () => {return {hello:'world'}})
}).middleware('auth:web,api').prefix('api')

Route.post('login', 'AuthController.store').prefix('api')
