import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/logout', 'AuthController.logout')
  Route.group(() => {
    Route.post('/', 'UsersController.store')
    Route.get('/', 'UsersController.index')
    Route.get('/:id', 'UsersController.show')
    Route.patch('/:id', 'UsersController.update')
    Route.put('/:id', 'UsersController.update')
    Route.delete('/:id', 'UsersController.destroy')
  }).prefix('users')
  Route.get('/team-member/list', 'TeamMembersController.list')
  Route.resource('team-member', 'TeamMembersController').apiOnly
}).prefix('api').middleware('auth:web,api')
Route.post('login', 'AuthController.store').prefix('api')