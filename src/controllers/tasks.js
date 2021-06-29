const Task = require('src/models/Task')
const collection = require('src/services/collection')

const index = (req, res) => res.json(collection(Task.all(), req))
const create = (req, res) => res.json(Task.create(req.body))
const show = (req, res) => res.json(Task.find(req.params.id))
const update = (req, res) => res.json(Task.update(req.params.id, req.body))
const remove = (req, res) => res.json(Task.remove(req.params.id))

module.exports = { index, create, show, update, remove }
