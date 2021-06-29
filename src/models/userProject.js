const createModel = require('src/services/createModel')
const { createUserProject } = require('src/services/factory')

module.exports = createModel({ factory: createUserProject, count: 501 })
