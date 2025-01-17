const mongoose= require('mongoose')

const otpSchema= mongoose.Schema({
    email:{ type:String, required:true},
    otp:{ type:String, required:true},
    createdAt:{ type:Date, default:Date.now, expires:180}         //expires in 180 seconds
})

const otp= mongoose.model('otp',otpSchema)

module.exports= otp;