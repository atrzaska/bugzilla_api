const filter = (results, req) => {
  for (const [key, value] of Object.entries(req.query)) {
    if (key.startsWith('filter.')) {
      const field = key.replace('filter.', '')
      let parsed = null

      if(value === 'true') {
        parsed = true
      } else if (value === 'false') {
        parsed = false
      } else if (value === 'null') {
        parsed = null
      } else if (!isNaN(value)) {
        parsed = parseInt(value)
      } else {
        parsed = value
      }

      results = results.filter(x => x[field] === parsed)
    }
  }

  return results
}

module.exports = filter
