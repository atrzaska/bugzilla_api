const paginate = require('./paginate')
const sort = require('./sort')

const collection = (results, req) => paginate(sort(results, req), req)

module.exports = collection
