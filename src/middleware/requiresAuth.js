const { verifyAccessToken } = require('src/services/jwt')
const User = require('src/models/User')

const requiresAuth = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    try {
      const payload = verifyAccessToken(token)
      req.user = User.find(payload.userId)
      req.token = token
      next()
    } catch (err) {
      res.status(401).json({})
    }
  } else {
    res.status(401).json({})
  }
}

module.exports = { requiresAuth }
