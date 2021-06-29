const createModel = require('src/services/createModel')
const { createComment } = require('src/services/factory')

module.exports = createModel({ factory: createComment, count: 51 })
