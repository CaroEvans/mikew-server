process.env.NODE_ENV = 'test'
const app = require('../index')
//chai tests
const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')

chai.use(chaiHttp)

// models
// const Booking = require('../models/Booking')



describe('GET /bookings', function () {
    this.timeout(15000)

    it('should return all our Bookings', (done) => {
        chai.request(app)
            .get('/bookings')
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

    it('Gets single booking', (done) => {
        chai.request(app)
            .put('/bookings/id')
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



describe('GET /id', function () {
    this.timeout(15000)

    it('Gets single booking', (done) => {
        chai.request(app)
            .get('/bookings/id')
            .send({
                'id': '5b454f5d1bba2a61ccd14a2c',
            })
            .end((err, res) => {
                should.equal(err, null)
                res.should.have.status(200)
                // res.should.be.json
                res.body.should.have.property('date')
                res.body.cost.should.equal(1234)
                done()
            })
    })
})