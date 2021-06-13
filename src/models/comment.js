const createModel = require('../helpers/createModel')
const { createComment } = require('../db/factory')

module.exports = createModel({ factory: createComment, count: 51 })
