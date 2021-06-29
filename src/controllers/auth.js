const User = require('src/models/User')
const { generateToken, refreshToken } = require('src/services/jwt')
const { validatePassword } = require('src/services/auth')
const createUser = require('src/services/user/create')
const {
  mapErrors,
  validate,
  signUpSchema,
  signInSchema,
} = require('src/services/yup')

const refresh = (req, res) => res.json({ token: refreshToken(req.token) })
const logout = (req, res) => res.json({})
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
    res.json({ token: generateToken({ id: user.id }) })
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
  refresh,
  logout,
  signin,
  signup,
  recover,
  confirm,
  showResetPassword,
  updateResetPassword,
}
