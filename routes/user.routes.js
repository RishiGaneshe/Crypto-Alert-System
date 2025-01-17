const express= require('express')
const router = express.Router()
const USER= require('../controllers/user.js')
const { JWTtokenAuth }= require('../middlewares/authJWT.js')

router.get("/dashboard", JWTtokenAuth,USER.handleGetRequest)

router.get("/dashboard/logout", JWTtokenAuth, USER.handleLogout)

router.post("/dashboard/set-alert", JWTtokenAuth, USER.handlePostAlert)


module.exports= router;


