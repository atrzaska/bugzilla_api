const User = require('../../models/User')
const { parseName } = require('../../helpers/utils')
const { hash } = require('../../helpers/bcrypt')

const create = (params) => {
  const { name, email, password, termsAccepted, newsletterSubscribed } = params
  const { firstName, lastName } = parseName(name)

  const attributes = {
    firstName,
    lastName,
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
