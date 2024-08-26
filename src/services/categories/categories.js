// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  categoriesDataValidator,
  categoriesPatchValidator,
  categoriesQueryValidator,
  categoriesResolver,
  categoriesExternalResolver,
  categoriesDataResolver,
  categoriesPatchResolver,
  categoriesQueryResolver
} from './categories.schema.js'
import { CategoriesService, getOptions } from './categories.class.js'
import { categoriesPath, categoriesMethods } from './categories.shared.js'

export * from './categories.class.js'
export * from './categories.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const categories = (app) => {
  // Register our service on the Feathers application
  app.use(categoriesPath, new CategoriesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: categoriesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(categoriesPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(categoriesExternalResolver),
        schemaHooks.resolveResult(categoriesResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(categoriesQueryValidator),
        schemaHooks.resolveQuery(categoriesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(categoriesDataValidator),
        schemaHooks.resolveData(categoriesDataResolver)
      ],
      patch: [
        schemaHooks.validateData(categoriesPatchValidator),
        schemaHooks.resolveData(categoriesPatchResolver)
      ],
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
