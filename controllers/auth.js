const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { hashPassword, comparePassword } = require('../helpers/auth')

//=============================================
//==================Register User===========================
//=============================================
exports.register = async (req, res) => {
  try {
    // 1.  destructuring name, email, password from body
    const { name, email, password } = req.body
    // 2. all field require validation
    if (!name.trim()) {
      return res.json({ error: 'Name is require' })
    }
    if (!email.trim()) {
      return res.json({ error: 'Email is require' })
    }
    if (!password || password.length < 6) {
      return res.json({ error: 'Password must be at least 6 character long' })
    }
    // check if email is taken
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      res.json({ error: 'User is taken' })
    }
    // hash password
    const hashedPassword = await hashPassword(password)

    // register user
    const user = await new User({
      name,
      email,
      password: hashedPassword,
    }).save()
    // create token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '7d',
    })
    // sending response
    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    })

   
    
  } catch (e) {
    console.log(e)
  }
}

//=============================================
//==================Login User===========================
//=============================================

exports.loginUser = async (req, res) => {

  try {
    // 1.  destructuring email, password from body
    const { email, password } = req.body

    // all field validation =
    if (!email) {
      res.json({ error: 'Email required' })
    }
    if (!password || password.length < 6) {
      res.json({ error: 'Password required' })
    }
    // check if email is taken
    const user = await User.findOne({ email })
    if (!user) {
      res.json({ error: 'User not found' })
    }
    // compare password
    const match = await comparePassword(password, user.password)
    if (!match) {
      return res.json({ error: 'Wrong Password' })
    }
    // create sign jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '7d',
    })

  
    // send response
    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token
    })
 

  } catch (e) {
    console.log(e)
  }
}

//=============================================
//==================    ===========================
//=============================================