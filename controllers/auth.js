const User = require("../models/user")
const jwt = require("jsonwebtoken")
require('dotenv').config()


exports.register = async (req, res)=>{
    try{
        const {name , email, password} = req.body
        if(!name.trim()){
            return res.json({error: "Name is require"})
        }
        if(!email.trim()){
            return res.json({error: "Email is require"})
        }
        if(!password || password.length < 6){
            return res.json({error: "Password must be at least 6 character long"})
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            res.json({error : "User is taken"})
        }
        // again code start from here 
        const hashedPassword = await hashPassword(password)
    }catch(e){

    }
}