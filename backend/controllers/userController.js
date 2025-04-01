const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//handle the register requests
async function handleRegister(req,res){
    const {fullname,email,password}=req.body
    //check if the required fields are missing
    if (!fullname || !email || !password){
        return res.status(400).json({"message":"required fields are missing"})
    }

    try{
        //check if the user already exists
        const users = await userModel.findOne({email})
        if (users) return res.status(409).json({"Message":"user already exists"})
        
        //hash the password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        
        //create the user
        await userModel.create({
            fullname,
            email,
            password:hashedPassword
        })
        
        //return the response
        res.status(201).json({"message":"user created successfully"})
    }catch(error){
        console.log(error)
        json.status(500).json({"message":"Internal server error"})
    }
}
// handle the login requests
async function handleLogin(req,res){
    try{
        //check if the required fields are missing
        const {email,password}=req.body
        if (!email || !password) return res.status(400).json({"message":"required fields are missing"})
    //check if the user exists
        const user = await userModel.findOne({email})
        if (!user) return res.status(404).json({"message":"user not found"})
        //compare the password
        const match=await bcrypt.compare(password,user.password)
        if (!match) return res.status(401).json({"message":"invalid credentrials"})

        //create the tokens
        const accessToken= jwt.sign({userId:user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'})
        const refreshToken=jwt.sign({userId:user._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'7d'})

        //send refresh token as a cookie and access token as a response
        res.cookie('refresh',refreshToken,{
            httpOnly:true,
            secure:false,
            sameSite:'strict',
            maxAge: 7*24*60*60*1000
        })
        res.status(200).json({accessToken})

    }catch(error){
        console.log(error)
        res.status(500).json({"message":"Internal server error"})
    }
}

async function getUserById(req,res){
    try{
        const data = await userModel.findById(req.userId).select("fullname email")
        res.status(200).json(data)
    }catch(err){
        console.log(err.message)
        res.sendStatus(500)
    }
}

async function removeUser(req,res){
    try{
        const userId = req.userId
        if (!userId) return res.status(400).json({"message":"user id is not provided"})
        await userModel.findByIdAndDelete(userId)
        res.clearCookie('refresh')
        res.json({"message":"user successfully removed"})
    }catch(err){
        console.log(err.message)
        res.sendStatus(500)
    }
}

module.exports={
    handleRegister,
    handleLogin,
    removeUser,
    getUserById
}