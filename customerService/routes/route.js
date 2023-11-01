const router = require('express').Router()
const {signup} = require('../controllers/appControllers')

router.post('/signup',signup)

module.exports = router