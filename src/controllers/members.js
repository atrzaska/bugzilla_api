const UserProject = require('src/models/UserProject')
const collection = require('src/services/collection')

const index = (req, res) => {
  const filterProjectId = parseInt(req.query['filter.projectId'])
  const members = UserProject.where({ projectId: filterProjectId })
  const userIds = members.map((x) => x.userId)
  const isCurrentUserMember = userIds.includes(req.user.id)

  if (!isCurrentUserMember) {
    res.status(403).json({})
    return
  }

  const results = UserProject.all()

  results.forEach((r) => {
    const user = User.find(r.userId)
    r.name = user.name
    r.email = user.email
    r.photoUrl = user.photoUrl
  })

  res.json(collection(results, req))
}
const create = (req, res) => res.json(UserProject.create(req.body))
const show = (req, res) => res.json(UserProject.find(req.params.id))
const update = (req, res) =>
  res.json(UserProject.update(req.params.id, req.body))
const remove = (req, res) => res.json(UserProject.remove(req.params.id))

module.exports = { index, create, show, update, remove }
