const User = require('../models/User')
const passport = require('passport')
const router = require('express').Router()

// custom middleware
const { requireJwt, register, signJwtForUser, login } = require('../middleware/authentication')

// register & login
router.post('/register', register, signJwtForUser)

router.post('/login', login, signJwtForUser)

router.post('/new', (req, res, next) => {
  Product.create(req.body, (err, product) => {
    if (err) return next(err);
    res.json(product);
  });
})

module.exports = router
