const createModel = require('src/services/createModel')
const { createUser } = require('src/services/factory')

const User = createModel({ factory: createUser, count: 2 })

User.revokeToken = (id) => {
  const user = User.find(id)
  const { tokenVersion } = user
  const newTokenVersion = tokenVersion + 1
  User.update(id, { tokenVersion: newTokenVersion })

  return newTokenVersion
}

module.exports = User
