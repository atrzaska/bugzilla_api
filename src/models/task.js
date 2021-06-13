const createModel = require('../helpers/createModel')
const { createTask } = require('../db/factory')

module.exports = createModel({ factory: createTask, count: 51 })
