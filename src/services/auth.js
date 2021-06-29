const { compare } = require('src/services/bcrypt')

const validatePassword = (user, password) => compare(password, user.password)

module.exports = { validatePassword }
