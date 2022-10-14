import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('login', 'AuthController.store') //.middleware('auth:web,api')
  Route.post('/logout', 'AuthController.logout').middleware('auth:web,api')
  Route.group(() => {
    Route.post('/', 'UsersController.store')
    Route.get('/', 'UsersController.index').middleware('auth:web,api')
    Route.get('/:id', 'UsersController.show').middleware('auth:web,api')
    Route.patch('/:id', 'UsersController.update').middleware('auth:web,api')
    Route.put('/:id', 'UsersController.update').middleware('auth:web,api')
    Route.delete('/:id', 'UsersController.destroy').middleware('auth:web,api')
  }).prefix('users')
}).prefix('api')
