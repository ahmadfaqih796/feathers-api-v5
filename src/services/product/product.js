// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  productDataValidator,
  productPatchValidator,
  productQueryValidator,
  productResolver,
  productExternalResolver,
  productDataResolver,
  productPatchResolver,
  productQueryResolver
} from './product.schema.js'
import { ProductService, getOptions } from './product.class.js'
import { productPath, productMethods } from './product.shared.js'

export * from './product.class.js'
export * from './product.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const product = (app) => {
  // Register our service on the Feathers application
  app.use(productPath, new ProductService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: productMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(productPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(productExternalResolver),
        schemaHooks.resolveResult(productResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(productQueryValidator), schemaHooks.resolveQuery(productQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(productDataValidator), schemaHooks.resolveData(productDataResolver)],
      patch: [schemaHooks.validateData(productPatchValidator), schemaHooks.resolveData(productPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
