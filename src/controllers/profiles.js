const User = require('../models/User')
const fields = require('../helpers/fields')

const show = (req, res) => res.json(fields(req.user, req))
const update = (req, res) => res.json(req.body)
const remove = (req, res) => res.json(User.remove(req.user.id))

const updateEmail = (req, res) => res.json(req.body)
const updatePassword = (req, res) => res.json(req.body)

module.exports = { show, update, remove, updateEmail, updatePassword }
