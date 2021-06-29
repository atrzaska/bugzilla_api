const Story = require('src/models/Story')
const Task = require('src/models/Task')
const Comment = require('src/models/Comment')
const collection = require('src/services/collection')

const index = (req, res) => {
  const results = Story.all()

  results.forEach((r) => {
    r.tasksCount = Task.where({ storyId: r.id }).length
    r.commentsCount = Comment.where({ storyId: r.id }).length
  })

  res.json(collection(results, req))
}
const create = (req, res) => {
  const attributes = {
    ...req.body,
    state: 'unstarted',
    tasksCount: 0,
    commentsCount: 0,
  }
  res.json(Story.create(attributes))
}
const show = (req, res) => res.json(Story.find(req.params.id))
const update = (req, res) => res.json(Story.update(req.params.id, req.body))
const remove = (req, res) => res.json(Story.remove(req.params.id))

module.exports = { index, create, show, update, remove }
