const User = require('src/models/User')
const { hash } = require('src/services/bcrypt')

const create = (params) => {
  const { name, email, password, termsAccepted, newsletterSubscribed } = params

  const attributes = {
    name,
    email,
    password: hash(password),
    termsAccepted,
    newsletterSubscribed,
    position: null,
    company: null,
    photoUrl: null,
    confirmed: false,
  }

  const user = User.create(attributes)

  return user
}

module.exports = create
