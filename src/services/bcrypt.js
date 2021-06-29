const bcrypt = require('bcryptjs')

const hash = (password) => {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)

  return bcrypt.hashSync(password, salt)
}

const compare = (password, hash) => bcrypt.compareSync(password, hash)

module.exports = { hash, compare }
