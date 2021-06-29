const createModel = require('src/services/createModel')
const { createProject } = require('src/services/factory')

module.exports = createModel({ factory: createProject, count: 501 })
