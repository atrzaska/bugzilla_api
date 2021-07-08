const User = require('src/models/User')
const { createAccessToken } = require('src/services/jwt/accessToken')
const { createRefreshToken } = require('src/services/jwt/refreshToken')
const sendRefreshTokenCookie = require('src/services/jwt/sendRefreshTokenCookie')
const { validatePassword } = require('src/services/auth')
const createUser = require('src/services/user/create')
const {
  mapErrors,
  validate,
  signUpSchema,
  signInSchema,
} = require('src/services/yup')

const logout = (req, res) => {
  sendRefreshTokenCookie(res, '')
  res.json({})
}
const signin = (req, res) => {
  const errors = validate(req.body, signInSchema)

  if (errors.length) {
    res.status(422).json(mapErrors(errors))
    return
  }

  const { email, password } = req.body
  const user = User.findBy({ email })

  if (!user) {
    res.status(422).json({})
    return
  }

  if (!user.confirmed) {
    res.status(422).json({})
  }

  if (validatePassword(user, password)) {
    sendRefreshTokenCookie(res, createRefreshToken(user))
    res.json({ accessToken: createAccessToken(user) })
  } else {
    res.status(422).json({})
  }
}
const signup = (req, res) => {
  const errors = validate(req.body, signUpSchema)

  if (errors.length) {
    res.status(422).json(mapErrors(errors))
    return
  }

  const { email } = req.body
  let user = User.findBy({ email })

  if (user) {
    res.status(422).json({ errors: { email: 'This email is already taken' } })
    return
  }

  user = createUser(req.body)

  res.json(user)
}
const recover = (req, res) => res.json(req.body)
const confirm = (req, res) => res.json(req.body)
const showResetPassword = (req, res) => res.json({ id: req.params.id })
const updateResetPassword = (req, res) => res.json(req.body)

module.exports = {
  logout,
  signin,
  signup,
  recover,
  confirm,
  showResetPassword,
  updateResetPassword,
}
