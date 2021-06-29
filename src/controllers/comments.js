const Comment = require('src/models/Comment')
const collection = require('src/services/collection')

const index = (req, res) => res.json(collection(Comment.all(), req))
const create = (req, res) => res.json(Comment.create(req.body))
const show = (req, res) => res.json(Comment.find(req.params.id))
const update = (req, res) => res.json(Comment.update(req.params.id, req.body))
const remove = (req, res) => res.json(Comment.remove(req.params.id))

module.exports = { index, create, show, update, remove }
