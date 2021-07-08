const { sign, verify } = require('jsonwebtoken')

const { ACCESS_TOKEN_SECRET } = process.env

const createAccessToken = (user) =>
  sign({ userId: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
const verifyAccessToken = (payload) => verify(payload, ACCESS_TOKEN_SECRET)
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
