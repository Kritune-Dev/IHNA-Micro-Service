const express = require('express')

// import all the routes here
const messengerRoutes = require('./messenger.routes')
const botRoutes = require('./bot.routes')

const router = express.Router()

router.use('/', messengerRoutes)
router.use('/bot', botRoutes)

module.exports = router
