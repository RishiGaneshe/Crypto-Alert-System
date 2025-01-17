const mongoose= require('mongoose')


exports.connectToMongoDB= async(url)=>{
        mongoose.connect(url)
}

