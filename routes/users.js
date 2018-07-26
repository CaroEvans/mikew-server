const User = require('../models/User')
const passport = require('passport')
const router = require('express').Router()
const Booking = require('../models/Booking')

const { requireJwt, register, signJwtForUser, login, isAdmin } = require('../middleware/authentication')

router.post('/register', register, signJwtForUser)
router.post('/login', login, signJwtForUser)


router.get('/all',requireJwt,isAdmin, (req,res)=>{
    User.find()
    .then( users => res.send(users))
    .catch(err => res.send(err))
})

router.delete('/delete', (req,res) =>{
    User.findByIdAndRemove(req.query.id)
    .then(user =>  res.sendStatus(204))
    .catch(err => res.send(err))
} )


router.get('/id',(req,res) => {
    User.findById(req.query.id)
    .then(user =>  res.send(user))
    .catch(err => res.send(err))
})

router.get('/bookings', (req, res) =>{
    Booking.find({clientId: req.query.id})
    .then(bookings => res.send(bookings))
    .catch(err => res.send(err))

})

module.exports = router
