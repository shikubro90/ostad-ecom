const User = require("../models/user")
const jwt = require("jsonwebtoken")
require('dotenv').config()

const {hashPassword} = require("../helpers/auth")

exports.register = async (req, res)=>{
    try{
        // 1.  destructuring name, email, password from body 
        const {name , email, password} = req.body
        // 2. all field require validation
        if(!name.trim()){
            return res.json({error: "Name is require"})
        }
        if(!email.trim()){
            return res.json({error: "Email is require"})
        }
        if(!password || password.length < 6){
            return res.json({error: "Password must be at least 6 character long"})
        }
        // check if email is taken
        const existingUser = await User.findOne({email})
        if(existingUser){
            res.json({error : "User is taken"})
        }
        // hash password
        const hashedPassword = await hashPassword(password)

        // register user
        const user = await new User({
            name, 
            email,
            password : hashedPassword
        }).save();
        // create token
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET_KEY,{
            expiresIn : "7d"
        })
        // sending response
        res.json({
            user : {
                name : user.name,
                email : user.email,
                role : user.role,
                address : user.address
            },
            token
        })

    }catch(e){
        console.log(e)
    }
}