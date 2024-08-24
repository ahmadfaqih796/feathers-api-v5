// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { passwordHash } from '@feathersjs/authentication-local'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const usersSchema = Type.Object(
  {
    id: Type.Number(),
    email: Type.String(),
    password: Type.Optional(Type.String()),
    googleId: Type.Optional(Type.String()),
    githubId: Type.Optional(Type.String())
  },
  { $id: 'Users', additionalProperties: false }
)
export const usersValidator = getValidator(usersSchema, dataValidator)
export const usersResolver = resolve({})

export const usersExternalResolver = resolve({
  // The password should never be visible externally
  password: async () => undefined
})

// Schema for creating new entries
export const usersDataSchema = Type.Pick(usersSchema, ['email', 'password', 'googleId', 'githubId'], {
  $id: 'UsersData'
})
export const usersDataValidator = getValidator(usersDataSchema, dataValidator)
export const usersDataResolver = resolve({
  password: passwordHash({ strategy: 'local' })
})

// Schema for updating existing entries
export const usersPatchSchema = Type.Partial(usersSchema, {
  $id: 'UsersPatch'
})
export const usersPatchValidator = getValidator(usersPatchSchema, dataValidator)
export const usersPatchResolver = resolve({
  password: passwordHash({ strategy: 'local' })
})

// Schema for allowed query properties
export const usersQueryProperties = Type.Pick(usersSchema, ['id', 'email', 'googleId', 'githubId'])
export const usersQuerySchema = Type.Intersect(
  [
    querySyntax(usersQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const usersQueryValidator = getValidator(usersQuerySchema, queryValidator)
export const usersQueryResolver = resolve({
  // If there is a user (e.g. with authentication), they are only allowed to see their own data
  id: async (value, user, context) => {
    if (context.params.user) {
      return context.params.user.id
    }

    return value
  }
})
