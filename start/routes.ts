import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/logout', 'AuthController.logout')
  Route.resource('users', 'UsersController').apiOnly().where('id', Route.matchers.uuid())
  Route.resource('team-member', 'TeamMembersController')
    .apiOnly()
    .where('id', Route.matchers.uuid())
})
  .prefix('api')
  .middleware('auth:web,api')
Route.post('login', 'AuthController.store').prefix('api')
