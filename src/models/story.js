const createModel = require('src/services/createModel')
const { createStory } = require('src/services/factory')

module.exports = createModel({ factory: createStory, count: 500 })
