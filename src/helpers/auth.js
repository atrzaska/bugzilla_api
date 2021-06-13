const { compare } = require('../helpers/bcrypt')

const validatePassword = (user, password) => compare(password, user.password)

module.exports = { validatePassword }
