process.env.NODE_ENV = 'test';
const app = require('../index')
//chai tests
const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const mongoose = require("mongoose");

chai.use(chaiHttp)