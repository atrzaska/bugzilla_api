const fields = (data, req) => {
  const fields = req.query.fields

  if (!fields) {
    return data
  }

  const splittedFields = fields.split(',')
  const result = {}

  splittedFields.forEach((field) => (result[field] = data[field]))

  return result
}

module.exports = fields
