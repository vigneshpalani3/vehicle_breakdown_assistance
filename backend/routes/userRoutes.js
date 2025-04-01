const router = require('express').Router()
const {handleRegister,handleLogin,removeUser, getUserById}=require('../controllers/userController')
const verifyJWT = require('../middlewares/verifyJWT')

router.post('/register',handleRegister)
router.post('/login',handleLogin)
router.delete('/',verifyJWT,removeUser)
router.get('/',verifyJWT,getUserById)

module.exports = router