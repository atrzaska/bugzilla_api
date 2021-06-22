const createModel = require('../helpers/createModel')
const { createUserProject } = require('../db/factory')

module.exports = createModel({ factory: createUserProject, count: 51 })
