const path = require('path');
const AuthModel = require('../Model/authModel');

const { validationResult } = require('express-validator');




exports.postupdtregistrationview = (req, res) => {
  
  const update_id = req.params.p_id;
  const updtname = req.body.name;
  const updtemailId = req.body.emailid;
  const updtphone = req.body.phone;
  const updtpassword = req.body.password;
  const profileImage =req.file.path;
  console.log(profileImage);
  console.log("update user:::::", update_id, updtname, updtemailId, updtphone, updtpassword,profileImage);

  

    AuthModel.findById(update_id).then((value) => {
    console.log("values", value);

    value.name = updtname
    value.emailId = updtemailId
    value.phone = updtphone
    value.password = updtpassword
    value.profileImage=profileImage

    return value.save().then((updatedValue) => {
      console.log("updated-value", updatedValue);
      return res.status(200).json({
        success: true,
        message: " Update Successful",
        updatedValue: updatedValue
        
      })
    }).catch((err) => {
      console.log("data not updated", err);
    })
  }).catch(err => {
    console.log(err);
  })
  
}
