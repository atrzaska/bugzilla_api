const createModel = require('../services/createModel')
const { createStory } = require('../services/factory')

module.exports = createModel({ factory: createStory, count: 500 })
