const jwt = require('jsonwebtoken')

const KEY = process.env.JWT_KEY
const OPTIONS = { expiresIn: '7d' }

const generateToken = (payload) => jwt.sign(payload, KEY, OPTIONS)
const verifyToken = (payload) => jwt.verify(payload, KEY, OPTIONS)
const refreshToken = (token) => {
  const payload = verifyToken(token)
  delete payload.exp
  delete payload.iat
  return generateToken(payload)
}

module.exports = {
  verifyToken,
  generateToken,
  refreshToken,
}
