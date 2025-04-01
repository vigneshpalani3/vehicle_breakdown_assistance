const providerModel = require('../models/providerModel')

async function checkNearbyProvider(request){
    try{
        const nearbyProvider = await providerModel.findOne({
            location: {
              $near: {
                $geometry: {
                  type: "Point",
                  coordinates:request.location.coordinates
                },
                $maxDistance:5000
              }
            }
          })
          if (!nearbyProvider) return false
          nearbyProvider.requests.push(request)
          await nearbyProvider.save()
    }catch(err){
        console.log(err)
        return false
    }
}

module.exports = checkNearbyProvider