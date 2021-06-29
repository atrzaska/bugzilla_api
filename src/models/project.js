const createModel = require('../services/createModel')
const { createProject } = require('../services/factory')

module.exports = createModel({ factory: createProject, count: 501 })
