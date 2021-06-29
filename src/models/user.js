const createModel = require('src/services/createModel')
const { createUser } = require('src/services/factory')

module.exports = createModel({ factory: createUser, count: 2 })
