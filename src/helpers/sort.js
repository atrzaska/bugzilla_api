const dup = (arr) => [].concat(arr)

const sortByField = (arr, field) =>
  arr.sort((a, b) => {
    var valA = a[field]
    var valB = b[field]

    if (valA < valB) {
      return -1
    }
    if (valA > valB) {
      return 1
    }

    return 0
  })

const sort = (results, req) => {
  const sort = req.query.sort || 'id_asc'
  const [field, direction] = sort.split('_')
  const descending = direction === 'desc'

  const sortedResults = sortByField(dup(results), field)
  const reversedResults = dup(sortedResults).reverse()
  return descending ? reversedResults : sortedResults
}

module.exports = sort
