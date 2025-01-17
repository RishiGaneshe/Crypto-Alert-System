require('dotenv').config();
const crypto= require('crypto')
const validator = require('validator')
const OTP= require('../models/MongoOtp.js')
const sgMail = require('@sendgrid/mail');
const UserData= require('../models/MongoMainAdmin.js');



sgMail.setApiKey('');


exports.emailAuthentication= async (req,res,next)=>{
  try{
     const {email}=req.body;
     if(!email)  { return res.status(403).end('Email is required')}

     const isValidEmail = validator.isEmail(email);
     if (!isValidEmail) return res.status(400).send('Invalid Email'); 
    
     const user= await UserData.findOne({email})
     if(user) { return  res.status(400).render('signUp',{error:'This Email is already used'}) }
     
     const otp= crypto.randomInt(100000,999999).toString();
     const sendOTP = async (to, otp) => {
          const msg = {
            to: to,
            from: 'info.dakshifoundation@gmail.com',
            subject: 'Your OTP Code',
            text: `Your OTP is: ${otp}`,
          };
      
          try {
              await sgMail.send(msg);
              console.log('OTP sent successfully');
              const newotp= new OTP({email,otp})
              await newotp.save();
          } catch (error) {
              console.error('Error sending OTP:', error);
          }
      }

      sendOTP(email, otp);    
      next();
    }
  catch(err){
         console.log(err)
         res.status(500).render('Error500')
  }
}




