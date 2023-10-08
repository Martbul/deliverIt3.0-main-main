const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('../lib/jwt')
const { SECRET } = require('../constants')

exports.singup = (userData) => {
   return User.create(userData)
}

exports.login = async (email, password) => {
   const user = await User.findOne({ email })
   
   if (!user) {
      throw new Error('invalid username or password')
   }
   const isValid = await bcrypt.compare(password, user.password)
   if (!isValid) {
      throw new Error('invalid ursername or passwor')
   }

   const payload = {
      _id: user._id,
      email: user.email
   }

   const token = await jwt.sing(payload, SECRET, { expiresIn: "3d" })
   return token
}