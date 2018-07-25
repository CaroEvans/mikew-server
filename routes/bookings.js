const router = require('express').Router()
const Booking = require('../models/Booking')

router.get('/', (req, res)=>{
    Booking.find()
    .then(bookings => res.send(bookings))
    .catch(err => res.send(err))
})

router.get('/:status', (req, res)=>{
    Booking.find({bookingStatus: req.params.status})
    .then(bookings => res.send(bookings))
    .catch(err => res.send(err))
})

router.get('/id',(req,res) => {
    Booking.findById(req.body.id)
    .then(booking =>  res.send(booking))
    .catch(err => res.send(err))
})

router.put('/id', (req,res) =>{
    const id  = req.body.id
    const bodyInfo = req.body
    delete bodyInfo['id']
    Booking.findByIdAndUpdate(id, bodyInfo)
    .then(booking =>  res.send(booking))
    .catch(err => res.send(err))
})

router.post('/new', (req,res)=>{
    Booking.create(req.body)
    .then(booking =>  res.send(booking))
    .catch(err => res.send(err))
})

module.exports = router