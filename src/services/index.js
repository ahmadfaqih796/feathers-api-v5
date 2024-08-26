import { categories } from './categories/categories.js'
import { product } from './product/product.js'
import { users } from './users/users.js'
export const services = (app) => {
  app.configure(categories)

  app.configure(product)

  app.configure(users)

  // All services will be registered here
}
