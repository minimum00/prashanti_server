const router = require('express').Router()
const {booking} = require('../controllers/appControllers')
const sendEmail = require('../controllers/emailController')
router.get('/booking',booking)
router.post('/send-email',sendEmail)

module.exports = router