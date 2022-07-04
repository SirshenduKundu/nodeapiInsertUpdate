const path = require('path');
const AuthModel = require('../Model/authModel');
const { validationResult } = require('express-validator');


exports.postregistrationview = (req, res) => {

  const name = req.body.name;
  const emailId = req.body.emailId;
  const phone = req.body.phone;
  const password = req.body.password;

   const profileImage =req.file.path;
   console.log(req.file);
   console.log(profileImage);
   
   console.log("insert user:::::", name, emailId, phone, password,profileImage);
 
  if (!name) {
    return res.status(401).json({
      success: false,
      message: "User name is required"
    })
  }

  else if (!emailId) {
    return res.status(401).json({
      success: false,
      message: "User Email is required"
    })
  }
  else if (!phone) {
    return res.status(401).json({
      success: false,
      message: "User phone number is required"
    })
  }
  else if (!password) {
    return res.status(401).json({
      success: false,
      message: "User Password is required"
    })
  }
  else if(!profileImage){
    return res.status(401).json({
      success:false,
      message:"User profileImage is required"
    })
  }
  else {
          const Registration = new AuthModel({
            name: name,
            emailId: emailId,
            phone: phone,
            password:password ,
            profileImage:profileImage

          })
          return Registration.save()
            .then((results) => {
              console.log("Successfully Insterted Value >>>>>>>>>>>>>>>",results)
              return res.status(200).json({
                success: true,
                message: "Successful",
                result: results
                
              })

            }).catch(err => {
              //console.log("error not Inserted value",err);
              return res.status(401).json({
                success: false,
                message: err
              })
            })
  }
}