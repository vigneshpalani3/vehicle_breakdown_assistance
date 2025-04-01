const { handleRegister, handleLogin, removeProvider,getAllProviders, getProviderById, getReceivedRequestsById } = require('../controllers/providerController')
const verifyJWT = require('../middlewares/verifyJWT')

const router=require('express').Router()

router.get('/',verifyJWT,getProviderById)
router.post('/register',handleRegister)
router.post('/login',handleLogin)
router.delete('/',verifyJWT,removeProvider)
router.get('/all',getAllProviders)
router.get('/reqs',getReceivedRequestsById)

module.exports=router