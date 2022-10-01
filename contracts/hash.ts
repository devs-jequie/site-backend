import { hashConfig } from '@adonisjs/core/build/config'
import Env from '@ioc:Adonis/Core/Env'
export default hashConfig({
  default: Env.get('HASH_DRIVER', 'argon'),

  list: {
    /**
     * Make sure to install the driver from npm
     * ------------------------------------

     * ------------------------------------
     */
    argon: {
      driver: 'argon2',
      variant: 'id',
      iterations: 3,
      memory: 4096,
      parallelism: 1,
      saltSize: 16,
    },
  },
})
