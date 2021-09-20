const express=require('express');

const{check,body}=require('express-validator');//express-validator import

const auth_Router=express.Router();
const auth_Controller=require('../Controller/authController');


//auth_Router.get('/reg',auth_Controller.getregistrationview)
auth_Router.post('/postRegistration',
 [
   body('firstname','First name can not be less than 4').isLength({min:4}),
   body('lastname','Last name can not be less than 3').isLength({min:3}),
  check('emailid').isEmail().withMessage("input valid email"),
 body('password','enter valid password').isLength({min:3,max:12})//number er jonno .matches('')
 ],
auth_Controller.postregistrationview)

//auth_Router.get('/login',auth_Controller.getloginpage)
auth_Router.post('/postlogin',auth_Controller.postloginpagevalue)

auth_Router.get('/logout',auth_Controller.getlogout)

module.exports=auth_Router;
 