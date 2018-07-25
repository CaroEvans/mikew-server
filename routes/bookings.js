const router = require('express').Router()
const Booking = require('../models/Booking')

const { requireJwt, isAdmin } = require('../middleware/authentication')

router.get('/', requireJwt, isAdmin, (req, res)=>{
    Booking.find()
    .then(bookings => res.send(bookings))
    .catch(err => res.send(err))
})

router.get('/:status', requireJwt, isAdmin, (req, res)=>{
    Booking.find({bookingStatus: req.params.status})
    .then(bookings => res.send(bookings))
    .catch(err => res.send(err))
})

router.get('/id',requireJwt, isAdmin,(req,res) => {
    Booking.findById(req.body.id)
    .then(booking =>  res.send(booking))
    .catch(err => res.send(err))
})

router.put('/id',requireJwt, (req,res) =>{
    const id  = req.body.id
    const bodyInfo = req.body
    delete bodyInfo['id']
    Booking.findByIdAndUpdate(id, bodyInfo)
    .then(booking =>  res.send(booking))
    .catch(err => res.send(err))
})

router.post('/new', requireJwt, (req,res)=>{
    Booking.create(req.body)
    .then(booking =>  res.send(booking))
    .catch(err => res.send(err))
})

module.exports = router