const sort = (results, req) => {
  const sort = req.query.sort || 'id_asc'

  const reversedResults = [].concat(results).reverse()
  return sort.endsWith('_desc') ? reversedResults : results
}

module.exports = sort
