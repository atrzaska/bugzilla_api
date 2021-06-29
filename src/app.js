const express = require('express')
const morgan = require('morgan')
const { NotFoundError } = require('./services/errors')
const apiRoutes = require('./routes/api')

const app = express()
const port = 4000

app.use(morgan('dev'))
app.use(express.json())
app.use('/api', apiRoutes)
app.use((err, req, res, next) => {
  console.log(err)

  if (err instanceof NotFoundError) {
    res.status(404).json({})
  } else {
    res.status(500).json({})
  }
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
