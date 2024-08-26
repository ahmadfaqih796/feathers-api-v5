export const categoriesPath = 'categories'

export const categoriesMethods = ['find', 'get', 'create', 'patch', 'remove']

export const categoriesClient = (client) => {
  const connection = client.get('connection')

  client.use(categoriesPath, connection.service(categoriesPath), {
    methods: categoriesMethods
  })
}
