import Route from '@ioc:Adonis/Core/Route'

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('login', 'AuthController.store')
  Route.post('/logout', 'AuthController.logout').middleware('auth:web,api')
  Route.group(() => {
    Route.post('/', 'UsersController.store')
    Route.get('/', 'UsersController.index').middleware('auth:web,api')
    Route.get('/:id', 'UsersController.show').middleware('auth:web,api')
    Route.patch('/:id', 'UsersController.update').middleware('auth:web,api')
    Route.put('/:id', 'UsersController.update').middleware('auth:web,api')
    Route.delete('/:id', 'UsersController.destroy').middleware('auth:web,api')
  }).prefix('users')
  Route.group(() => {
    Route.post('/', 'EventsController.store').middleware('auth:web,api')
    Route.get('/', 'EventsController.index')
    Route.get('/:id', 'EventsController.show').middleware('auth:web,api')
    Route.patch('/:id', 'EventsController.update').middleware('auth:web,api')
    Route.put('/:id', 'EventsController.update').middleware('auth:web,api')
    Route.delete('/:id', 'EventsController.destroy').middleware('auth:web,api')
  }).prefix('events')
  Route.get('/team-member/list', 'TeamMembersController.list')
  Route.resource('team-member', 'TeamMembersController')
    .apiOnly()
    .where('id', Route.matchers.uuid())
})
  .prefix('api')
  .middleware('auth:web,api')


