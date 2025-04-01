const { json } = require('express')
const jwt = require('jsonwebtoken')

async function verifyJWT(req,res,next){
    const authHeader=req.headers['authorization']
    // getting access token from auth header 
    const accessToken= authHeader && authHeader.split(' ')[1]
    try{
        //check if accesstoken exists
        if (!accessToken) return res.status(401).json({"message":"unauthorized"})
        // verify and get the user id
        jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if (err) return res.status(403).json({"message":err.message})
            req.userId=decoded.userId
            next()
        })
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

module.exports=verifyJWT