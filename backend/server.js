const express=require('express')
const app=express()
const port=process.env.PORT || 3000
const cors=require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser')

const connectDb=require('./db/connectDb')
const userRoutes=require('./routes/userRoutes')
const providerRoutes=require('./routes/providerRoutes')
const requestRoutes=require('./routes/requestsRoutes')
const verifyJWT = require('./middlewares/verifyJWT')
const handleRefresh = require('./controllers/refreshController')

connectDb()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send('Hello World')
})
//users login and register routes
app.use('/api/user',userRoutes)

//provider login and register routes
app.use('/api/provider',providerRoutes)

//request routes
app.use('/api/request',verifyJWT,requestRoutes)

app.use('/verify',verifyJWT,(req,res)=>{
    res.send(`${req.userId}`)
})

app.post('/refresh',handleRefresh)

app.post('/logout',(req,res)=>{
    res.cookie('refresh','',{
        httpOnly:true,
        secure:false,
        sameSite:'strict',
        maxAge: 60*1000
    })
    res.sendStatus(200)
})

app.get('*',(req,res)=>{
    res.send('404 Page not found')
})


app.listen(port,console.log(`Server is running on port ${port}`))