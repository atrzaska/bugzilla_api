const paginate = require('./paginate')
const sort = require('./sort')
const filter = require ('./filter')

const collection = (results, req) => paginate(sort(filter(results, req), req), req)

module.exports = collection
