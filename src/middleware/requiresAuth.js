const { verifyAccessToken } = require('src/services/jwt/accessToken')
const User = require('src/models/User')

const requiresAuth = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const accessToken = authHeader.split(' ')[1]

    try {
      const payload = verifyAccessToken(accessToken)
      req.user = User.find(payload.userId)
      req.accessToken = accessToken
      next()
    } catch (err) {
      res.status(401).json({})
    }
  } else {
    res.status(401).json({})
  }
}

module.exports = { requiresAuth }
