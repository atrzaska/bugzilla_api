const createModel = require('../services/createModel')
const { createTask } = require('../services/factory')

module.exports = createModel({ factory: createTask, count: 51 })
