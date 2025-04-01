const requestsModel=require('../models/requestsModel')
const checkNearbyProvider = require('./checkNearbyController')

async function handleState(req,res){
    try{
        const {reqId,state}=req.body
        if (!reqId || !state) return res.status(400).json({"message":"credentials are missing"})
        const request=await requestsModel.findById(reqId)
        if (!request) return res.status(400).json({"message":"user not found"})
        request.status=state
        await request.save()
        res.status(201).json({"message":"status updated"})
    }catch(err){
        console.log(err.message)
        res.sendStatus(500)
    }
}

async function addRequest(req,res){
    try{
        const {issue,vehicleName,vehicleModel,vehicleMake,location} = req.body
        if (!req.userId || !issue ||  !vehicleName || !vehicleMake || !vehicleModel || !location) return res.status(400).json({"message":"required fields are missing"})
        const request= await requestsModel.create({
            requestingUser:req.userId,
            issueType:issue,
            vehicleName,
            vehicleMake,
            vehicleModel,
            location:{type:"Point",coordinates:location}
        })
        const result =await checkNearbyProvider(request)
        if (result===false) return res.status(404).json({"message":"could not find any service providers"})
        res.status(201).json({"message":"request raised",request})
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

async function removeRequest(req,res){
    try{
        const {reqId}=req.params
        if (!reqId) return res.status(400).json({"message":"request id not found"})
        await requestsModel.findByIdAndDelete(reqId)
        res.status(201).json({"message":"request successfully removed"})
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

async function getAllRequests(req,res){
    try{
        const requests=await requestsModel.find({requestingUser:req.userId})
        res.status(201).json(requests)
    }catch(err){
        console.log(err.message)
        res.sendStatus(500)
    }
}

module.exports={handleState,removeRequest,addRequest,getAllRequests}