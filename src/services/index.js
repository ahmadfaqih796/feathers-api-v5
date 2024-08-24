import { users } from './users/users.js'
export const services = (app) => {
  app.configure(users)

  // All services will be registered here
}
