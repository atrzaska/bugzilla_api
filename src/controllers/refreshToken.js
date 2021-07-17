const User = require('src/models/User')
const { createAccessToken } = require('src/services/jwt/accessToken')
const {
  createRefreshToken,
  verifyRefreshToken,
} = require('src/services/jwt/refreshToken')
const sendRefreshTokenCookie = require('src/services/jwt/sendRefreshTokenCookie')

const create = async (req, res) => {
  const refreshToken = req.cookies.jid

  if (!refreshToken) {
    return res.status(403).send({})
  }

  let payload = null
  let user = null

  try {
    payload = verifyRefreshToken(refreshToken)
  } catch (err) {
    console.log(err)
    return res.status(403).send({})
  }

  // token is valid and
  // we can send back an access token

  try {
    user = await User.find(payload.userId)
  } catch (err) {
    return res.status(403).send({})
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.status(403).send({})
  }

  sendRefreshTokenCookie(res, createRefreshToken(user))

  return res.send({ accessToken: createAccessToken(user) })
}

module.exports = { create }
