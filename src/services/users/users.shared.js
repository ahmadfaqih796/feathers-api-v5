export const usersPath = 'users'

export const usersMethods = ['find', 'get', 'create', 'patch', 'remove']

export const usersClient = (client) => {
  const connection = client.get('connection')

  client.use(usersPath, connection.service(usersPath), {
    methods: usersMethods
  })
}
