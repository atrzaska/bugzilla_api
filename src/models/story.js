const createModel = require('../helpers/createModel')
const { createStory } = require('../db/factory')

module.exports = createModel({ factory: createStory, count: 500 })
