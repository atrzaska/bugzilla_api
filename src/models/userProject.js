const createModel = require('../services/createModel')
const { createUserProject } = require('../services/factory')

module.exports = createModel({ factory: createUserProject, count: 501 })
