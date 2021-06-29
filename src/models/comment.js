const createModel = require('../services/createModel')
const { createComment } = require('../services/factory')

module.exports = createModel({ factory: createComment, count: 51 })
