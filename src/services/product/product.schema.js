// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const productSchema = Type.Object(
  {
    id: Type.Number(),
    n_product: Type.String(),
    description: Type.String(),
    price: Type.Number(),
    stock: Type.Number()
  },
  { $id: 'Product', additionalProperties: false }
)
export const productValidator = getValidator(productSchema, dataValidator)
export const productResolver = resolve({})

export const productExternalResolver = resolve({})

// Schema for creating new entries
export const productDataSchema = Type.Pick(productSchema, ['n_product', 'description', 'price', 'stock'], {
  $id: 'ProductData'
})
export const productDataValidator = getValidator(productDataSchema, dataValidator)
export const productDataResolver = resolve({})

// Schema for updating existing entries
export const productPatchSchema = Type.Partial(productSchema, {
  $id: 'ProductPatch'
})
export const productPatchValidator = getValidator(productPatchSchema, dataValidator)
export const productPatchResolver = resolve({})

// Schema for allowed query properties
export const productQueryProperties = Type.Pick(productSchema, [
  'id',
  'n_product',
  'description',
  'price',
  'stock'
])
export const productQuerySchema = Type.Intersect(
  [
    querySyntax(productQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const productQueryValidator = getValidator(productQuerySchema, queryValidator)
export const productQueryResolver = resolve({})
