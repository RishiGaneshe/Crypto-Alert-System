const validator= require('validator')
const xss= require('xss');



exports.validateAndSanitizeSignInInfo= async (req, res, next)=>{
  try{
    const { email, username, otp } = req.body
    const errors = [];

    if (!username || !validator.isLength(username, { min: 1 })) {
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
    } else {
      req.body.email = xss(email.trim());
    }


    if (!otp || !validator.isNumeric(otp.toString()) || otp.toString().length !== 6) {
      errors.push("OTP must be a valid 6-digit numeric code.");
    } 
    
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  }catch(err){
       console.log("Error in Input Validation API: ", err)
       return res.status(500).json({ msg: "Internal Server Error"})
  }
}


exports.validateAndSanitizeGuestInput= async (req, res, next)=>{
  try{
    const { name, address, mobile, purpose, to_date, from_date, email, idNumber } = req.body
    const errors = [];

      if (!name || !validator.isLength(name, { min: 1 })) {
        errors.push('Name is required.')
      }else{
        req.body.name = xss(name.trim())
        if (!validator.isAlphanumeric(req.body.name, 'en-US', { ignore: ' ' })) {
          errors.push('Name contains invalid characters.');
        }
      }

      if (!address || !validator.isLength(address, { min: 1 })) {
        errors.push('Address is required.')
      }else{
        req.body.address = xss(address.trim())
      }

      if (!mobile || !validator.isMobilePhone(mobile.toString())) {
        errors.push('Mobile Number must be valid.');
      } else {
        req.body.mobile = xss(mobile.toString());
      }

      if (!purpose || !validator.isLength(purpose, { min: 3, max: 100 })) {
        errors.push('Purpose is required and must be between 3 to 100 characters.');
      } else {
        req.body.purpose = xss(purpose.trim());
      }

      if (!to_date || !validator.isISO8601(to_date)) {
        errors.push('Dates must be in a valid ISO8601 format.');
      } else {
        req.body.to_date = xss(to_date);
      }

      if (!from_date || !validator.isISO8601(from_date)) {
        errors.push('Dates must be in a valid ISO8601 format.');
      } else {
        req.body.from_date = xss(from_date);
      }

      if (!email || !validator.isEmail(email)) {
        errors.push('Email must be valid.');
      } else {
        req.body.email = xss(email.trim());
      }

      if (!idNumber || !validator.isLength(idNumber, { min: 5, max: 20 })) {
        errors.push('ID Number must be between 5 and 20 characters.');
      } else {
        req.body.idNumber = xss(idNumber.trim());
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      next();
  }catch(err){
       console.log("Error in Input Validation API: ", err)
       return res.status(500).json({ msg: "Internal Server Error"})
  }
}


exports.validateAndSanitizeHotelInfo= async (req, res, next)=>{
  try{
    const { hotelname, hoteladdress, } = req.body
    const errors = [];

      if (!hotelname || !validator.isLength(hotelname, { min: 1 })) {
        errors.push('Name is required.')
      }else{
        req.body.hotelname = xss(hotelname.trim())
        if (!validator.isAlphanumeric(req.body.hotelname, 'en-US', { ignore: ' ' })) {
          errors.push('Name contains invalid characters.');
        }
      }

      if (!hoteladdress || !validator.isLength(hoteladdress, { min: 1 })) {
        errors.push('Address is required.')
      }else{
        req.body.hoteladdress = xss(hoteladdress.trim())
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      next();
  }catch(err){
       console.log("Error in Input Validation API: ", err)
       return res.status(500).json({ msg: "Internal Server Error"})
  }
}
