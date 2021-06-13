const fillArray = require('./fillArray')

const DEFAULT_LIMIT = 10

const paginate = (results, req) => {
  if (req.query.offset) {
    return withLimitOffsetPagination(results, req)
  } else if (req.query.page) {
    return withPagePerPagination(results, req)
  } else {
    return { collection: results, total: results.length }
  }
}

const withPagePerPagination = (results, req) => {
  let { page = 1, per = DEFAULT_LIMIT } = req.query
  page = parseInt(page)
  per = parseInt(per)

  const offset = (page - 1) * per
  const limit = per
  const collection = results.slice(offset, offset + limit)

  return {
    collection,
    total: results.length,
  }
}

const withLimitOffsetPagination = (obj, req) => {
  const results = fillArray(obj, SIZE)
  let { offset = 0, limit = DEFAULT_LIMIT } = req.query
  offset = parseInt(offset)
  limit = parseInt(limit)
  const collection = results.slice(offset, offset + limit)

  return {
    collection,
    total: results.length,
  }
}

module.exports = paginate
