const express = require('express')

// import all the routes here
const calendarWorkRoutes = require('./calendarWork.routes')

const router = express.Router()

router.use('/', calendarWorkRoutes)

module.exports = router
