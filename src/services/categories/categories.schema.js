// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const categoriesSchema = Type.Object(
  {
    id: Type.Number(),
    n_category: Type.String(),
    description: Type.String()
  },
  { $id: 'Categories', additionalProperties: false }
)
export const categoriesValidator = getValidator(categoriesSchema, dataValidator)
export const categoriesResolver = resolve({})

export const categoriesExternalResolver = resolve({})

// Schema for creating new entries
export const categoriesDataSchema = Type.Pick(categoriesSchema, ['n_category', 'description'], {
  $id: 'CategoriesData'
})
export const categoriesDataValidator = getValidator(categoriesDataSchema, dataValidator)
export const categoriesDataResolver = resolve({})

// Schema for updating existing entries
export const categoriesPatchSchema = Type.Partial(categoriesSchema, {
  $id: 'CategoriesPatch'
})
export const categoriesPatchValidator = getValidator(categoriesPatchSchema, dataValidator)
export const categoriesPatchResolver = resolve({})

// Schema for allowed query properties
export const categoriesQueryProperties = Type.Pick(categoriesSchema, ['id', 'text'])
export const categoriesQuerySchema = Type.Intersect(
  [
    querySyntax(categoriesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const categoriesQueryValidator = getValidator(categoriesQuerySchema, queryValidator)
export const categoriesQueryResolver = resolve({})
