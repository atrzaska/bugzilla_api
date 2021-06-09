const fillArray = require('../helpers/fillArray')
const {
  createUser,
  createProject,
  createTask,
  createComment,
  createStory,
} = require('./factory')

const user = createUser(1)
const users = fillArray(createUser, 51)

const project = createProject(1)
const projects = fillArray(createProject, 51)

const task = createTask(1)
const tasks = fillArray(createTask, 51)

const comment = createComment(1)
const comments = fillArray(createComment, 51)

const story = createStory(1)
const stories = fillArray(createStory, 51)

module.exports = {
  user,
  users,
  project,
  projects,
  task,
  tasks,
  comment,
  comments,
  story,
  stories,
}
