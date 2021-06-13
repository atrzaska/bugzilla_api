const express = require('express')
const morgan = require('morgan')
const { generateToken, refreshToken } = require('./helpers/jwt')
const { requiresAuth } = require('./middleware/requiresAuth')
const Project = require('./models/project')
const Story = require('./models/Story')
const Comment = require('./models/Comment')
const Task = require('./models/Task')
const User = require('./models/User')
const collection = require('./helpers/collection')
const { validatePassword } = require('./helpers/auth')

const app = express()
const port = 4000

app.use(morgan('dev'))
app.use(express.json())

app.post('/api/signin', (req, res) => {
  const { email, password } = req.body
  const user = User.findBy({ email })

  if (!user) {
    res.status(404).json({})
    return
  }

  if (validatePassword(user, password)) {
    res.json({ user, token: generateToken(user) })
  } else {
    res.status(422).json({})
  }
})
app.get('/api/refresh_token', requiresAuth, (req, res) =>
  res.json({ token: refreshToken(req.token) })
)

app.post('/api/register', (req, res) => res.json(User.find(1)))
app.post('/api/logout', requiresAuth, (req, res) => res.json({}))
app.get('/api/me', requiresAuth, (req, res) => res.json(req.user))

app.get('/api/projects', requiresAuth, (req, res) =>
  res.json(collection(Project.all(), req))
)
app.post('/api/projects', requiresAuth, (req, res) =>
  res.json(Project.create(req.body))
)
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
app.post('/api/stories', requiresAuth, (req, res) =>
  res.json(Story.create(req.body))
)
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
  res.json(collection(Comment.all()))
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

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
