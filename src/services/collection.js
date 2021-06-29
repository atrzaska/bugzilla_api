const paginate = require('src/services/paginate')
const sort = require('src/services/sort')
const filter = require('src/services/filter')

const collection = (results, req) =>
  paginate(sort(filter(results, req), req), req)

module.exports = collection
