process.env.NODE_ENV = 'test'
const app = require('../index')
//chai tests
const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')

chai.use(chaiHttp)

// models
const User = require('../models/User')

// test variables

let id = ''
let token = ''

// users


describe('POST /users/register', function () {

    this.timeout(15000)
    beforeEach(function(done){
        User.collection.drop();
        done();
      })

    it('Registers new user', (done) => {
        chai.request(app)
            .post('/users/register')
            .send({
                firstName:'String',
                lastName:'String',
                email:'jim@jim.com',
                phoneNumber:'12312',
                password:'pass123',
                role:'admin',
                profileImg:'a cool images'
            })
            .end((err, res) => {
                should.equal(err, null)
                res.should.have.status(200)
                res.body.should.have.property('token')
                done()
            })
    })
})


describe('POST /users/login', function () {
    this.timeout(15000)

    it('Login user and get token', (done) => {
        chai.request(app)
            .post('/users/login')
            .send({
                email:'jim@jim.com',
                password:'pass123',
            })
            .end((err, res) => {
                should.equal(err, null)
                res.should.have.status(200)
                token = `Bearer ${res.body.token}`
                res.body.should.have.property('token')
                done()
            })
    })
})


describe('Get /users/all', function () {
    this.timeout(15000)

    it('Gets all contacts', (done) => {
        chai.request(app)
            .get('/users/all')
            .set('Authorization', token)
            .end((err, res) => {
                should.equal(err, null)
                res.should.have.status(200)
                res.body[0].should.have.property('email')
                id = res.body[0]._id
                done()
            })
    })
})


// Bookings

describe('GET /bookings', function () {
    this.timeout(15000)

    it('should return all our Bookings', (done) => {
        chai.request(app)
            .get('/bookings')
            .set('Authorization', token)
            .end((err, res) => {
                should.equal(err, null)
                res.should.have.status(200)
                res.should.be.json
                res.body.should.be.a('array')
                res.body[0].should.have.property('date')
                res.body[0].should.have.property('cost')
                done()
            })
    })
})

describe('GET /bookings/completed', function () {
    this.timeout(15000)

    it('should return all completed bookings', (done) => {
        chai.request(app)
            .get('/bookings/completed')
            .set('Authorization', token)
            .end((err, res) => {
                should.equal(err, null)
                res.should.have.status(200)
                res.should.be.json
                res.body.should.be.a('array')
                res.body[0].should.have.property('date')
                res.body[0].bookingStatus.should.equal('completed')
                done()
            })
    })
})

describe('GET /bookings/pending', function () {
    this.timeout(15000)

    it('should return all pending bookings', (done) => {
        chai.request(app)
            .get('/bookings/pending')
            .set('Authorization', token)
            .end((err, res) => {
                should.equal(err, null)
                res.should.have.status(200)
                res.should.be.json
                res.body.should.be.a('array')
                res.body[0].should.have.property('date')
                res.body[0].bookingStatus.should.equal('pending')
                done()
            })
    })
})

describe('Post /bookings/new', function () {
    this.timeout(15000)

    it('creates new booking', (done) => {
        chai.request(app)
            .post('/bookings/new')
            .set('Authorization', token)
            .send({
                'date': '20180715',
                'startTime': '8:30',
                'endTime': '9:30',
                'clientId': '0',
                'cost': 100,
                'info':'i want drums and guitars and coll music man',
                'bookingStatus': 'pending'
            })
            .end((err, res) => {
                should.equal(err, null)
                res.should.have.status(200)
                res.body.should.have.property('date')
                res.body.cost.should.equal(100)
                done()
            })
    })
})

describe('PUT/id', function () {
    this.timeout(15000)

    it('Updates Booking', (done) => {
        chai.request(app)
            .put('/bookings/id')
            .set('Authorization', token)
            .send({
                'id': '5b454f5d1bba2a61ccd14a2c',
                'cost': 1234,
                'info':'!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
                
            })
            .end((err, res) => {
                should.equal(err, null)
                res.should.have.status(200)
                done()
            })
    })
})



// // Contact

describe('Post /contact/new', function () {
    this.timeout(15000)

    it('creates new contact form', (done) => {
        chai.request(app)
            .post('/contact/new')
            .send({
                name: 'Jim',
                email: 'jim2emial.com',
                phone: '098963923',
                artist: 'String',
                comment: 'i want to book an appointment',
                createdAt: 'a time stamp'
            })
            .end((err, res) => {
                should.equal(err, null)
                res.should.have.status(200)
                res.body.should.have.property('email')
                res.body.name.should.equal('Jim')
                done()
            })
    })
})

describe('GET /contact/all', function () {
    this.timeout(15000)

    it('Gets all contacts requests', (done) => {
        chai.request(app)
            .get('/contact/all')
            .set('Authorization', token)
            .end((err, res) => {
                should.equal(err, null)
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body[0].should.have.property('email')
                done()
            })
    })
})


// /// below tests need updated

// describe('Get /users/id', function () {
//     this.timeout(15000)

//     it('Gets single contact', (done) => {
//         chai.request(app)
//             .get('/users/id')
//             .send({id})
//             .end((err, res) => {
//                 should.equal(err, null)
//                 res.should.have.status(200)
//                 // res.body.should.have.property('email')
//                 done()
//             })
//     })
// })

// describe('Get /users/bookings', function () {
//     this.timeout(15000)

//     it('Gets contacts Bookings', (done) => {
//         chai.request(app)
//             .get('/users/bookings')
//             .send({id})
//             .end((err, res) => {
//                 should.equal(err, null)
//                 res.should.have.status(200)
//                 done()
//             })
//     })
// })