const createModel = require('../helpers/createModel')
const { createProject } = require('../db/factory')

module.exports = createModel({ factory: createProject, count: 501 })
