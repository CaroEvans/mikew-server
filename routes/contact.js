const router = require('express').Router()
const Contact = require('../models/Contact')

const { isAdmin, requireJwt } = require('../middleware/authentication')


router.get('/all',requireJwt ,isAdmin ,(req,res)=>{
    Contact.find()
    .then(contacts => res.send(contacts))
    .catch(err => res.send(err))
})

router.post('/new', (req,res)=>{
    Contact.create(req.body)
    .then(contact =>  res.send(contact))
    .catch(err => res.send(err))
})

module.exports = router