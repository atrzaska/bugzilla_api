const { sign, verify } = require('jsonwebtoken')

const { REFRESH_TOKEN_SECRET } = process.env
const createRefreshToken = (user) =>
  sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  )
const verifyRefreshToken = (payload) => verify(payload, REFRESH_TOKEN_SECRET)

module.exports = {
  createRefreshToken,
  verifyRefreshToken,
}
1
