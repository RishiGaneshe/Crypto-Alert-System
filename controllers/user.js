const path= require('path')
const jwt= require('jsonwebtoken')
const secret= 'bddshue6732943rhrt31387439042594rh42sm3rm32557smHRW74397'
const { redisClient }= require('../services/RedisConnection.js')
const ALERT= require('../models/Alert.js')



exports.handleGetRequest= async (req, res)=>{
    try{
        const AbsolutePath= path.join(__dirname, '..','public', 'index.html')
        return res.status(200).sendFile(AbsolutePath)
    }catch(err){
        console.log(err)
        res.status(500).end('Server having issues.Try again later. Server Error')
    }
}


exports.handleLogout= async(req,res)=>{
  try{ 
      const token= req.cookies.session_id
       if(!token) {return res.status(401).render('Error401')}

      const decoded= jwt.verify(token,secret);
      const expirationTime = decoded.exp - Math.floor(Date.now() / 1000);
      
      await redisClient.set(token,'blacklisted','EX',expirationTime);
      res.clearCookie('session_id');
      console.log(`User ${decoded.username} Logged-Out`)
      return res.status(200).redirect("/login")
 
  }catch(err){
      console.log(err)
      return res.status(500).render('Error500')
  }
}


exports.handlePostAlert= async (req, res)=>{
    try{
        const userId= req.user._id;
        const { cryptocurrency, targetPrice, condition }= req.body

        if (!userId || !cryptocurrency || !targetPrice || !condition) {
            return res.status(400).json({ success: false, message: 'All fields are required' })
        }

        if (!['above', 'below'].includes(condition)) {
            return res.status(400).json({ success: false, message: 'Condition must be "above" or "below"' })
        }

        const newAlert= new ALERT({
            userId,
            cryptocurrency,
            targetPrice,
            condition,
        })
        const savedAlert= await newAlert.save()

        return res.status(201).json({ success: true, message: 'Alert created successfully',alert: savedAlert })

    }catch(err){
        console.error('Error creating alert:', error)
        res.status(500).json({ success: false, message: 'Internal server error'})
    }
}