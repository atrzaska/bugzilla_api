const bcrypt = require('bcryptjs')

const hash = (pass) => {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)

  return bcrypt.hashSync(pass, salt)
}

const compare = (password, hash) => bcrypt.compareSync(password, hash)

module.exports = { hash, compare }
