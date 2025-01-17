const mongoose= require('mongoose')


const mainAdminSchema= new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

const mainAdmin= mongoose.model('mainAdminUserAndPass',mainAdminSchema)


module.exports= mainAdmin