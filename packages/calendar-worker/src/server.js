const express = require('express')
const compress = require('compression')
const helmet = require('helmet')
const morgan = require('morgan')
const tmp = require('tmp')

const { logs } = require('./constants')

const cors = require('./config/cors.config')
const clientLogs = require('./config/client-log.config')

const routes = require('./routes/v1')
const error = require('./middlewares/error')

/**
 * Express instance
 * @public
 */
const app = express()

// request logging. dev: console | production: file
app.use(morgan(logs))

// This middleware take care of the origin when the origin is undefined.
// origin is undefined when request is local
app.use((req, _, next) => {
  req.headers.origin = req.headers.origin || req.headers.host
  next()
})

// CORS configuration
app.use(cors())

// parse body params and attache them to req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// gzip compression
app.use(compress())

// secure apps by setting various HTTP headers
app.use(helmet())

// mount api v1 routes
app.use('/api/v1/calendar-worker', routes)
app.use('/api/calendar-worker/client-log', clientLogs)

// if error is not an instanceOf APIError, convert it.
app.use(error.converter)

// catch 404 and forward to error handler
app.use(error.notFound)

// error handler, send stacktrace only during development
app.use(error.handler)

// temporary files created using tmp will be deleted on UncaughtException
tmp.setGracefulCleanup()

module.exports = app
