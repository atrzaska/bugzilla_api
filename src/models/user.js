const createModel = require('../services/createModel')
const { createUser } = require('../services/factory')

module.exports = createModel({ factory: createUser, count: 2 })
