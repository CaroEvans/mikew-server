const router = require('express').Router()
const Booking = require('../models/Booking')

router.get('/', (req, res)=>{
    Booking.find()
    .then(bookings => res.send(bookings))
    .catch(err => res.send(err))
})

router.get('/completed', (req, res)=>{
    Booking.find({bookingStatus: 'completed'})
    .then(bookings => res.send(bookings))
    .catch(err => res.send(err))
})

router.get('/pending', (req, res)=>{
    Booking.find({bookingStatus: 'pending'})
    .then(bookings => {res.send(bookings)})
    .catch(err => res.send(err))
})

router.get('/declined', (req, res)=>{
    Booking.find({bookingStatus: 'declined'})
    .then(bookings => {res.send(bookings)})
    .catch(err => res.send(err))
})

router.get('/cancelled', (req, res)=>{
    Booking.find({bookingStatus: 'cancelled'})
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