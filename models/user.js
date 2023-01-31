const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true,
  },
  email: {
    type: String,
    trim: true,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    min: 6,
    max: 64,
  },
  address: {
    type: String,
    trim: true,
  },
  role: {
    type: Number,
    default: 0,
  },
})

const User = mongoose.model('User', userSchema)
module.exports = User
