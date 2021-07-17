const User = require('src/models/User')
const fields = require('src/services/fields')
const sendRefreshTokenCookie = require('src/services/jwt/sendRefreshTokenCookie')

const show = (req, res) => res.json(fields(req.user, req))
const update = (req, res) => {
  if (req.file) {
    req.body.photoUrl = `/${req.file.path}`
  }
  req.body.newsletterSubscribed = req.body.newsletterSubscribed === 'true'

  const user = User.update(req.user.id, req.body)

  res.json(user)
}
const remove = (req, res) => {
  sendRefreshTokenCookie(res, '')

  res.json(User.remove(req.user.id))
}
const updateEmail = (req, res) => res.json(req.body)
const updatePassword = (req, res) => res.json(req.body)

module.exports = { show, update, remove, updateEmail, updatePassword }
