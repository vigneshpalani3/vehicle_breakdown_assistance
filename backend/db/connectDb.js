const mongoose=require('mongoose')


const connectDb=async()=>{
    try {
        console.log('Connecting to the database')
        await mongoose.connect(process.env.MONGODB_URI,{dbName:'users'})
        console.log('Database connected')
    } catch (error) {
        console.log('Database connection failed')
        console.log(error)
    }
}

module.exports=connectDb