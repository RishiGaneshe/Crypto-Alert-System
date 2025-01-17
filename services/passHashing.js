const bcrypt= require('bcrypt')


exports.hashPassword= async (password)=>{
    const saltRounds= 10;
    return await bcrypt.hash(password,saltRounds)
}


exports.verifyPassword= async (password,hashedpassword)=>{
    return await bcrypt.compare(password,hashedpassword)
}

