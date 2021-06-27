const SIZE = 10

const paginate = (results, req) => {
  if (req.query.offset) {
    return withLimitPagination(results, req)
  } else if (req.query.page) {
    return withPagePagination(results, req)
  } else {
    return { collection: results, total: results.length }
  }
}

const withPagePagination = (results, req) => {
  let { page = 1, size = SIZE } = req.query
  page = parseInt(page)
  size = parseInt(size)

  const offset = (page - 1) * size
  const limit = size
  const collection = results.slice(offset, offset + limit)

  return {
    collection,
    total: results.length,
  }
}

const withLimitPagination = (results, req) => {
  let { offset = 0, limit = SIZE } = req.query
  offset = parseInt(offset)
  limit = parseInt(limit)
  const collection = results.slice(offset, offset + limit)

  return {
    collection,
    total: results.length,
  }
}

module.exports = paginate
