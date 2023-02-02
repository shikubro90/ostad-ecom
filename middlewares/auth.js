const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.requireSignIn = (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY,
    )
    req.user = decode
    next()
  } catch (error) {
    return res.status(401).json(error)
  }
};
