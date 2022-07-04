const express=require('express');

const auth_Router=express.Router();
const auth_Controller=require('../Controller/authController');
const auth_update_controller=require('../Controller/authupdatecontroller');


auth_Router.post('/postRegistration',auth_Controller.postregistrationview)
auth_Router.get('/updatepostRegistration/:p_id',auth_update_controller.postupdtregistrationview)


module.exports=auth_Router;
 