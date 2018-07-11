const User = require('../models/User')
const passport = require('passport')
const router = require('express').Router()

const { requireJwt, register, signJwtForUser, login } = require('../middleware/authentication')

router.post('/register', register, signJwtForUser)
router.post('/login', login, signJwtForUser)

module.exports = router
