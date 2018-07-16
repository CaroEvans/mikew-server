const passport = require('passport')
const PassportJwt = require('passport-jwt')
const JWT = require('jsonwebtoken')
const User = require('../models/User')
// const Booking = require('../models/booking')

// JWT config
const jwtSecret = process.env.JWTSECRET
const jwtAlgorithm = process.env.JWTALGORITHM
const jwtExpiresIn = process.env.JWTEXPIRESIN

passport.use(User.createStrategy())

// Passport processes the JWT for us
passport.use(new PassportJwt.Strategy({
  jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
  algorithms: [jwtAlgorithm]
}, (payload, done) => {
  // Payload is the info from our token
  User.findById(payload.sub)
    .then((user) => {
      if (user) {
        done(null, user)
      } else{
        done(null, false)
      }
    })
    .catch((error) => {
      done(error, false)
    })
}))

// register middleware (create new user in our database)
const register = (req, res, next) => {

 const {firstName, lastName, email, phoneNumber, password, role, profileImg} = req.body

  User.register(new User({ firstName, lastName, email, phoneNumber, role, profileImg}), password, (err, user) => {
    if (err) {
      return res.status(500).send(err.message)
    }
    // Add the user info to req.user so we can access
    // it from other middleware
    req.user = user
    next()
  });
}

// create a JWT (user just logged in or just signed up)
const signJwtForUser = (req, res) => {
  const user = req.user

  // create a signed token
  const token = JWT.sign(
    {
      email: user.email
    },
    jwtSecret,
    {
      subject: user._id.toString(),
      algorithm: jwtAlgorithm,
      expiresIn: jwtExpiresIn
    }
  );

  // send it to the user
  res.send({token: token})
}

module.exports = {
  initializePassport: passport.initialize(),
  requireJwt: passport.authenticate('jwt', { session: false }),
  login: passport.authenticate('local', { session: false }),
  register,
  signJwtForUser
}
