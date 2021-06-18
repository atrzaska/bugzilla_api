function createErrorJSON(err) {
  return {
    errors: {
      email: {
        message: err,
      },
    },
  }
}

function capitalize(string) {
  if (!string) {
    return
  }

  return string.charAt(0).toUpperCase() + string.slice(1)
}

function getBase64(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => resolve(event.target.result)
    reader.onerror = (error) => reject(error)
  })
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

function fullName({ firstName, lastName }) {
  return [firstName, lastName].filter((x) => Boolean(x)).join(' ')
}

function parseName(name) {
  const splittedName = name.trim().split(' ')
  const firstName = capitalize(splittedName[0]) || ''
  const lastName = capitalize(splittedName[1]) || ''
  return { firstName, lastName }
}

function contains(arr, item) {
  return arr.indexOf(item) !== -1
}

function isPresent(value) {
  if (value === false) {
    return false
  }
  if (value === null) {
    return false
  }
  if (value === undefined) {
    return false
  }
  if (value === '') {
    return false
  }
  const stringified = JSON.stringify(value)
  if (stringified === '{}') {
    return false
  }
  if (stringified === '[]') {
    return false
  }
  return true
}

function presence(value) {
  if (value === false) {
    return null
  }
  if (value === null) {
    return null
  }
  if (value === undefined) {
    return null
  }
  if (value === '') {
    return null
  }
  const stringified = JSON.stringify(value)
  if (stringified === '{}') {
    return null
  }
  if (stringified === '[]') {
    return null
  }
  return value
}

function rate(unique, total) {
  if (total === 0) {
    return 0
  }
  if (unique > total) {
    return 1.0
  }
  if (total === null) {
    return 0
  }

  return unique / total
}

module.exports = {
  createErrorJSON,
  capitalize,
  getBase64,
  slugify,
  fullName,
  parseName,
  contains,
  isPresent,
  presence,
  rate,
}
