const { verifyToken } = require('../helpers/jwt')
const User = require('../models/User')

const requiresAuth = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]
    try {
      const payload = verifyToken(token)
      req.user = User.find(payload.id)
      req.token = token
      next()
    } catch (err) {
      console.log(err)
      res.status(401).json({})
    }
  } else {
    console.log(err)
    res.status(401).json({})
  }
}

module.exports = { requiresAuth }
