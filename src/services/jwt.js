const { sign, verify } = require('jsonwebtoken')

const { ACCESS_TOKEN_SECRET } = process.env

const OPTIONS = { expiresIn: '7d' }

const createAccessToken = (payload) =>
  sign(payload, ACCESS_TOKEN_SECRET, OPTIONS)
const verifyAccessToken = (payload) => verify(payload, KEY, OPTIONS)
const refreshAccessToken = (token) => {
  const payload = verifyAccessToken(token)
  delete payload.exp
  delete payload.iat
  return createAccessToken(payload)
}

module.exports = {
  verifyAccessToken,
  createAccessToken,
  refreshAccessToken,
}
