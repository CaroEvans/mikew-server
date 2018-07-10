process.env.NODE_ENV = 'test'
const app = require('../index')
//chai tests
const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const mongoose = require("mongoose")

chai.use(chaiHttp)

// models
const Booking = require('../models/booking')



describe('GET /bookings', function () {
    this.timeout(15000)

    it('should return all our Bookings', (done) => {
        chai.request(app)
            .get('/bookings')
            .end((err, res) => {
                should.equal(err, null)
                res.should.have.status(200)
                res.should.be.json
                res.body.should.be('array')
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
                res.body.should.be('array')
                res.body[0].should.have.property('date')
                res.body[0].completed.should.equal('completed')
                res.body[0].should.have.property('parentId')
                res.should.have.status(200)
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
                res.body.should.be('array')
                res.body[0].should.have.property('date')
                res.body[0].completed.should.equal('pending')
                res.should.have.status(200)
                done()
            })
    })
})
