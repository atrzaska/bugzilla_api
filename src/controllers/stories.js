const Story = require('../models/Story')
const collection = require('../services/collection')

const index = (req, res) => res.json(collection(Story.all(), req))
const create = (req, res) => {
  res.json(
    Story.create({
      ...req.body,
      state: 'unstarted',
      tasksCount: 0,
      commentsCount: 0,
    })
  )
}
const show = (req, res) => res.json(Story.find(req.params.id))
const update = (req, res) => res.json(Story.update(req.params.id, req.body))
const remove = (req, res) => res.json(Story.remove(req.params.id))

module.exports = { index, create, show, update, remove }
