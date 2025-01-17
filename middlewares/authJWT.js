const secret= "bddshue6732943rhrt31387439042594rh42sm3rm32557smHRW74397";
const jwt= require('jsonwebtoken')
const { redisClient }= require('../services/RedisConnection')


exports.JWTtokenAuth= async (req, res, next)=>{
    try{
        const token= req.cookies.session_id
             if(!token){ return res.status(401).render('Error401') }

        const blacklisted= await redisClient.get(token)
              if(blacklisted) {
                  return res.status(401).render('Error401')
              }
        req.user= jwt.verify(token,secret)
        req.token= token
        
        next();
    }catch(err){
        console.log("Invalid Token")
      return res.status(401).render('Error500')
    }
}
