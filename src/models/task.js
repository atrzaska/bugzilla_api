const createModel = require('src/services/createModel')
const { createTask } = require('src/services/factory')

module.exports = createModel({ factory: createTask, count: 51 })
