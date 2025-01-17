const express= require('express')
const router= express.Router()
const { emailAuthentication }= require('../middlewares/emailService.js')
const GETrequests= require('../controllers/getRequests.js')
const POSTrequests= require('../controllers/postRequests.js')
const { validateAndSanitizeSignInInfo }= require('../middlewares/validation.js')




router.get("/sign-up", GETrequests.handleEmailSignUp)

router.get("/login", GETrequests.handleGetLoginPage)

router.get("/forget-password", GETrequests.handleGetForgetPasswordPage)

router.get("/websocket", GETrequests.handleGetWebSOcket)



router.post("/sign-up", emailAuthentication, GETrequests.handleUserSignup )

router.post("/login", POSTrequests.handlePostLogin)

router.post("/sign-up/otp-submission", validateAndSanitizeSignInInfo, POSTrequests.handlePostOtpSignUp )

router.post("/forget-password", POSTrequests.handlePostForgetPassword)

router.post("/forget-password/change-password", POSTrequests.handlePostChangePassword)


module.exports= router