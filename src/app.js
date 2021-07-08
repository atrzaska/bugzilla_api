const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { NotFoundError } = require('src/services/errors')
const apiRoutes = require('src/routes/api')

const app = express()
const port = 4000

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:8080', credentials: true }))
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
