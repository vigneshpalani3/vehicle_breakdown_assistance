const jwt=require('jsonwebtoken')
require('dotenv').config()

async function handleRefresh(req,res){
    try{
        const refreshToken=req.cookies.refresh || null
        console.log(refreshToken)
        if (!refreshToken) return res.status(401).json({"message":"unauthorized"})
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,decoded)=>{
            if (err) return res.status(403).json({"message":err.message})
            const accessToken=jwt.sign({userId:decoded.userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'7d'})
            res.json({accessToken})
            })
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

module.exports=handleRefresh