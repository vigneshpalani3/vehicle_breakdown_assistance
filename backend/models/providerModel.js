const mongoose = require('mongoose')

const providerSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    location:{
        type:{type:String,enum:['Point'],required:true,default:"Point"},
        coordinates:{
            type:[Number],
            required:true,
            validate:{
                validator:(arr)=>{
                    console.log(arr.length)
                    return arr.length==2
                },
                message:"coordinate values must be [longitude,latitude]"
            }
        },
    },
    requests:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"requests",
        default:[]
    }
},{timestamps:true})

providerSchema.index({location:"2dsphere"})

const providerModel=mongoose.model('providers',providerSchema)

module.exports=providerModel