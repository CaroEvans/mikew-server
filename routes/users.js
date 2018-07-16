const User = require('../models/User')
const passport = require('passport')
const router = require('express').Router()

const { requireJwt, register, signJwtForUser, login } = require('../middleware/authentication')

router.post('/register', register, signJwtForUser)
router.post('/login', login, signJwtForUser)

// need to add auth middleware

router.get('/all', (req,res)=>{
    User.find()
    .then( users => res.send(users))
    .catch(err => res.send(err))
})


router.get('/id',(req,res) => {
    User.findById(req.body.id)
    .then(user =>  res.send(user))
    .catch(err => res.send(err))
})

router.get('user/bookings', (req, res) =>{
    Booking.find({clientId: req.body.id})
    .then(bookings => res.send(bookings))
    .catch(err => res.send(err))

})

module.exports = router
