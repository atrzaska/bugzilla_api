const UserProject = require('src/models/UserProject')
const Project = require('src/models/Project')
const collection = require('src/services/collection')

const index = (req, res) => {
  const userProjects = UserProject.where({ userId: req.user.id })
  const projectIds = userProjects.map((x) => x.projectId)
  const projects = Project.where({ id: projectIds })
  res.json(collection(projects, req))
}
const create = (req, res) => {
  const project = Project.create(req.body)
  UserProject.create({
    userId: req.user.id,
    projectId: project.id,
    role: 'owner',
  })
  res.json(project)
}
const show = (req, res) => {
  const userId = req.user.id
  const projectId = parseInt(req.params.id)
  const userProject = UserProject.all().find(
    (up) => up.userId === userId && up.projectId === projectId
  )
  let isOwner = false

  if (userProject) {
    isOwner = userProject.role === 'owner'
  }

  res.json({ ...Project.find(projectId), isOwner })
}
const update = (req, res) => res.json(Project.update(req.params.id, req.body))
const remove = (req, res) => res.json(Project.remove(req.params.id))

module.exports = { index, create, show, update, remove }
