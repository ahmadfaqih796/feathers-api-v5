export const productPath = 'product'

export const productMethods = ['find', 'get', 'create', 'patch', 'remove']

export const productClient = (client) => {
  const connection = client.get('connection')

  client.use(productPath, connection.service(productPath), {
    methods: productMethods
  })
}
