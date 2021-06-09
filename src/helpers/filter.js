const SEPARATOR = ','

const parse = (value) => {
  let parsed = null

  if (value.includes(SEPARATOR)) {
    return value.split(SEPARATOR).map((v) => parse(v))
  }

  if (value === 'true') {
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

  return parsed
}
const filter = (results, req) => {
  for (const [key, value] of Object.entries(req.query)) {
    if (key.startsWith('filter.')) {
      const field = key.replace('filter.', '')
      const parsedValue = parse(value)

      results = results.filter((r) => {
        if (Array.isArray(parsedValue)) {
          return parsedValue.includes(r[field])
        } else {
          return r[field] === parsedValue
        }
      })
    }
  }

  return results
}

module.exports = filter
