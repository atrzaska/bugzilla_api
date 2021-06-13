const createModel = require('../helpers/createModel')
const { createUser } = require('../db/factory')

module.exports = createModel({ factory: createUser, count: 2 })
