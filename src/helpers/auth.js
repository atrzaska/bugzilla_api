const ADMIN = 'admin@bugzilla.com'

const validatePassword = ({ email, password }) => email === ADMIN

module.exports = { validatePassword }
