const { hashPassword, verifyPassword }= require('../services/passHashing.js')
const MainAdmin= require('../models/MongoMainAdmin.js')
const jwt= require('jsonwebtoken')
const OTP= require('../models/MongoOtp.js')
const secret= 'bddshue6732943rhrt31387439042594rh42sm3rm32557smHRW74397'
const Email= require('../middlewares/sendEmail.js')
const xss= require('xss')
const validator= require('validator')
const crypto= require('crypto')



exports.handlePostOtpSignUp= async (req,res)=>{
    try{
        const { username,password,email,otp }= req.body

        const storedOtp= await OTP.findOne({email:{ $eq: email },otp:{ $eq: otp }}) 
            if(!storedOtp){
                return res.status(401).json({ success: false, message: "Invalid OTP"})
            }

        const hashedPassword= await hashPassword(password)
        const result= await MainAdmin.create({
            email: email,
            username: username,
            password: hashedPassword,
        })

        await OTP.deleteOne({email:{ $eq: email },otp:{ $eq: otp }})

        return res.status(200).json({ success: true, message: `New User ${username} Created Successfully`})

    }catch(err){
        console.error(err)
        return res.status(500).json({ success: false, message: "Error in Creating new User. Internal Server Error"})
    }
}


exports.handlePostLogin= async(req,res)=>{
    try{
        let {username,password}= req.body
        const errors = [];

        if (!username || !password || !validator.isLength(username, { min: 3 })) {
            errors.push("Username and password are required.");
        }else {
            req.body.username = xss(username.trim());
            const usernameRegex = /^[a-zA-Z0-9._-]+$/;
            if (!usernameRegex.test(req.body.username)) {
              errors.push("Name contains invalid characters.");
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        
        password = xss(validator.escape(validator.trim(password)))

        const user= await MainAdmin.findOne({username})
            if (!user) {
                await verifyPassword("FakePassword", "FakeHash")
                return res.status(401).render('loginPage',{error:'Invalid Credentials.'})
            }
            if(!(user && await verifyPassword(password,user.password))) {
                return res.status(401).render('loginPage',{error:'Invalid Credentials.'})
            }

        async function jwtToken(user){
            try{
                const token= await jwt.sign( { _id: user._id, username: user.username }, secret , { expiresIn: '120m' } );
                return token;
            }catch(err){
                console.log(err)
            }
        }
        const token= await jwtToken(user);
        
        res.cookie('session_id', token,{
            domain: '192.168.1.2',
            path: '/',
            sameSite: 'Lax',
            httpOnly: true,
            secure: false,
            maxAge: 2 * 60 * 60 * 1000   
        })
        console.log("User Log in successfully.")
        return res.status(302).redirect("/dashboard")
    
    }catch(err){
        console.error(err)
        return res.status(500).json({ success: false, message: "Internal Server Error"}) 
    }
}


exports.handlePostForgetPassword= async (req,res)=>{
    try{
        const {email,username}= req.body
        const errors = [];

        if (!username || !validator.isLength(username, { min: 3 })) {
              errors.push('Name is required.')
        }else{
              req.body.username = xss(username.trim())
              const usernameRegex = /^[a-zA-Z0-9._-]+$/;
              if (!usernameRegex.test(req.body.username)) {
                errors.push('Name contains invalid characters.');
              }
        }

        if (!email || !validator.isEmail(email)) {
              errors.push('Email must be valid.');
        }else {
              req.body.email = xss(email.trim());
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        
        const result= await MainAdmin.findOne({username:{ $eq: username },email:{ $eq: email }})
            if (!result){ return res.status(400).render('forgetPassword',{error:'No account Present with corrent provided data.'}) }
        
        const otp= crypto.randomInt(100000,999999).toString();

        await Email.sendForgetPassOtp(email,otp);
        
        res.status(200).render('changePassword',{error:null,email:email})
        
    }catch(err){
        console.log(err)
        return res.status(500).json({ success: false, message: "Internal Server Error"}) 
    }
}


exports.handlePostChangePassword= async(req,res)=>{
    try{
        const {otp,email,confirmPassword,newPassword}= req.body
        const errors = [];

        if(!(newPassword===confirmPassword)){
            return  res.status(404).render('changePassword',{error:'Enter Same Password At Both Fields',email:email});
        }

        if (!otp || !validator.isNumeric(otp.toString()) || otp.toString().length !== 6) {
              errors.push("OTP must be a valid 6-digit numeric code.");
        } 

        const result3= await OTP.findOne({email:{ $eq: email },otp:{ $eq: otp }})
            if(!result3){
                return res.status(400).render('changePassword',{error:'Invalid OTP',email:email})
            }

        const user= await MainAdmin.findOne({email:{ $eq: email }})
            if (!user){ return res.status(400).json({ success:false, message:"NO User Present"})}
        const username= user.username;

        const hashedPassword= await hashPassword(newPassword)
        const filter= {username:{ $eq: username }}
        const update= { $set: {password:hashedPassword} }

        const result= await MainAdmin.updateOne(filter,update)
        if(result){
             if (result.matchedCount === 0) {
                  return res.status(404).render('forgetPassword',{error:'Problem In Changing Password'});
             }else if(result.modifiedCount===0){     
                  return res.status(200).render('loginPage',{error:'Password Changed Successfully'});
             }else {
                  console.log("Password changed Successfully by user "+username)
                  return res.status(200).render('loginPage',{error:'Password Changed Successfully'});
             }
        }else{
             console.log("Error in password changed")
             return res.status(404).render('forgetPassword',{error:'Problem In Changing Password'});
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({ success: false, message: "Internal Server Error"}) 
    }
}