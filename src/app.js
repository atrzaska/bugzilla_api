const express = require('express')
const morgan = require('morgan')
const { generateToken, refreshToken } = require('./helpers/jwt')
const { requiresAuth } = require('./middleware/requiresAuth')
const Project = require('./models/project')
const Story = require('./models/Story')
const Comment = require('./models/Comment')
const Task = require('./models/Task')
const User = require('./models/User')
const UserProject = require('./models/userProject')
const collection = require('./helpers/collection')
const { validatePassword } = require('./helpers/auth')
const createUser = require('./services/user/create')
const { fullName } = require('./helpers/utils')
const {
  mapErrors,
  validate,
  signUpSchema,
  signInSchema,
} = require('./helpers/yup')

const app = express()
const port = 4000

app.use(morgan('dev'))
app.use(express.json())

app.get('/api/refresh_token', requiresAuth, (req, res) =>
  res.json({ token: refreshToken(req.token) })
)
app.post('/api/signin', (req, res) => {
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

  if (validatePassword(user, password)) {
    res.json({ user, token: generateToken(user) })
  } else {
    res.status(422).json({})
  }
})
app.post('/api/signup', (req, res) => {
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
})
app.post('/api/logout', requiresAuth, (req, res) => res.json({}))
app.get('/api/me', requiresAuth, (req, res) => res.json(req.user))

app.get('/api/projects', requiresAuth, (req, res) => {
  const userProjects = UserProject.where({ userId: req.user.id })
  const projectIds = userProjects.map((x) => x.projectId)
  const projects = Project.where({ id: projectIds })
  res.json(collection(projects, req))
})
app.post('/api/projects', requiresAuth, (req, res) => {
  const project = Project.create(req.body)
  UserProject.create({
    userId: req.user.id,
    projectId: project.id,
    role: 'owner',
  })
  res.json(project)
})
app.get('/api/projects/:id', requiresAuth, (req, res) =>
  res.json(Project.find(req.params.id))
)
app.put('/api/projects/:id', requiresAuth, (req, res) =>
  res.json(Project.update(req.params.id, req.body))
)
app.delete('/api/projects/:id', requiresAuth, (req, res) =>
  res.json(Project.remove(req.params.id))
)

app.get('/api/stories', requiresAuth, (req, res) =>
  res.json(collection(Story.all(), req))
)
app.post('/api/stories', requiresAuth, (req, res) => {
  res.json(
    Story.create({
      ...req.body,
      state: 'unstarted',
      tasksCount: 0,
      commentsCount: 0,
    })
  )
})
app.get('/api/stories/:id', requiresAuth, (req, res) =>
  res.json(Story.find(req.params.id))
)
app.put('/api/stories/:id', requiresAuth, (req, res) =>
  res.json(Story.update(req.params.id, req.body))
)
app.delete('/api/stories/:id', requiresAuth, (req, res) =>
  res.json(Story.remove(req.params.id))
)

app.get('/api/tasks', requiresAuth, (req, res) =>
  res.json(collection(Task.all(), req))
)
app.post('/api/tasks', requiresAuth, (req, res) =>
  res.json(Task.create(req.body))
)
app.get('/api/tasks/:id', requiresAuth, (req, res) =>
  res.json(Task.find(req.params.id))
)
app.put('/api/tasks/:id', requiresAuth, (req, res) =>
  res.json(Task.update(req.params.id, req.body))
)
app.delete('/api/tasks/:id', requiresAuth, (req, res) =>
  res.json(Task.remove(req.params.id))
)

app.get('/api/comments', requiresAuth, (req, res) =>
  res.json(collection(Comment.all(), req))
)
app.post('/api/comments', requiresAuth, (req, res) =>
  res.json(Comment.create(req.body))
)
app.get('/api/comments/:id', requiresAuth, (req, res) =>
  res.json(Comment.find(req.params.id))
)
app.put('/api/comments/:id', requiresAuth, (req, res) =>
  res.json(Comment.update(req.params.id, req.body))
)
app.delete('/api/comments/:id', requiresAuth, (req, res) =>
  res.json(Comment.remove(req.params.id))
)

app.get('/api/members', requiresAuth, (req, res) => {
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
    r.name = fullName(user)
    r.email = user.email
    r.photoUrl = user.photoUrl
  })

  res.json(collection(results, req))
})
app.post('/api/members', requiresAuth, (req, res) =>
  res.json(UserProject.create(req.body))
)
app.get('/api/members/:id', requiresAuth, (req, res) =>
  res.json(UserProject.find(req.params.id))
)
app.put('/api/members/:id', requiresAuth, (req, res) =>
  res.json(UserProject.update(req.params.id, req.body))
)
app.delete('/api/members/:id', requiresAuth, (req, res) =>
  res.json(UserProject.remove(req.params.id))
)

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
