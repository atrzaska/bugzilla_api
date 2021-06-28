const { verifyToken } = require('../helpers/jwt')

const requiresAuth = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]
    try {
      req.user = verifyToken(token)
      delete req.user.iat
      delete req.user.exp
      req.token = token
      next()
    } catch (err) {
      res.status(401).json({ error: 'token invalid' })
    }
  } else {
    res.status(401).json({ error: 'token invalid' })
  }
}

module.exports = { requiresAuth }
