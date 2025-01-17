exports.handleEmailSignUp= async (req,res)=>{
    try{
         res.status(200).render('SU',{error:null})
    }catch(err){
         console.log(err)
         res.status(404).render('Error404')
    }
}


exports.handleUserSignup= async(req,res)=>{
    try{
        const { email }= req.body
       res.status(200).render('otpSubmission', { email: email});
    }catch(error){
       if (error instanceof mongoose.Error.ValidationError) {
           return res.status(400).render('signUp',{error:'problem in creating user'});
       }
       if (error.code === 11000) {   
           return res.status(409).render('signUp',{error:'This Email is already used'});
       }
       res.status(404).render('Error404')
    }
}


exports.handleGetLoginPage= async (req,res)=>{
    try{
        res.status(200).render('loginPage',{error:null})
    }catch(err){
        console.log("error in sending Login page",err)
        res.status(404).render('Error404')
    }
}


exports.handleGetForgetPasswordPage= async (req,res)=>{
    try{
        res.status(200).render('forgetPassword',{error:null})
    }catch(err){
        console.log(err)
        res.status(500).render('Error500')
    }
}


exports.handleGetChangePasswordPage= async (req,res)=>{
    try{
        res.status(200).render('changePassword',{error:null})
    }catch(err){
        console.log(err)
        res.status(500).render('Error500')
    }
}


exports.handleGetWebSOcket= async (req,res)=>{
    try{
        res.status(200).render('A')
    }catch(err){
        console.log(err)
        res.status(500).render('Error500')
    }
}