const mongoose = require('mongoose')

const RrequestSchema = new mongoose.Schema({
    requestingUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    issueType:{
        type:String,
        required:true
    },
    vehicleName:{
        type:String,
        required:true,
    },
    vehicleMake:{
        type:Number,
        required:true
    },
    vehicleModel:{
        type:String,
        required:true
    },
    location:{
        type:{type:String,enum:['Point'],required:true,default:"Point"},
        coordinates:{
            type:[Number],
            required:true,
            validate:{
                validator:(arr)=>{
                    return arr.length==2
                },
                message:"coordinate values must be [longitude,latitude]"
            }
        }
    },
    status:{
        type:String,
        default:"pending"
    }
},{timestamps:true})

const requestsModel=mongoose.model("requests",RrequestSchema)

module.exports=requestsModel