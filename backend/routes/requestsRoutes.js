const router = require('express').Router()
const {handleState, addRequest, getAllRequests, removeRequest} = require('../controllers/requestController')

router.post('/',addRequest)
router.get("/",getAllRequests)
router.patch('/',handleState)
router.delete('/:reqId',removeRequest)

module.exports=router