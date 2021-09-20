const path=require('path');
const AuthModel = require('../Model/authModel');
const bcrypt = require('bcryptjs')//import strong password
const {validationResult}=require('express-validator');
const nodemailer=require('nodemailer')
const sendGridMailer=require('nodemailer-sendgrid-transport')
const createTranspoter=nodemailer.createTransport(sendGridMailer({
auth:{api_key:'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'
}
}))
const jwt = require('jsonwebtoken');

// exports.getregistrationview=(req,res)=>{// view registration page
//     res.render('Auth/reg',
//     {title:'registration page',
//   path:'/reg',
//   error:[]
//   })
// }
exports.postregistrationview=(req,res)=>{
    console.log("total body value",req.body);
     const firstName  =req.body.firstname;
     const lastName =req.body.lastname;
     const emailId =req.body.emailid;
     const password =req.body.password;
       console.log("Coming from form:::::",firstName,lastName,emailId,password);
//----------------------
if(!firstName){
  return res.status(401).json({
    success:false,
    message:"User first name is required"
  })
}
else if(!lastName){
  return res.status(401).json({
    success:false,
    message:"User last name is required"
  })
}
else if(!emailId){
  return res.status(401).json({
    success:false,
    message:"User Email is required"
  })
}
else if(!password){
  return res.status(401).json({
    success:false,
    message:"User Password is required"
  })
}
    //  AuthModel.findOne({emailId:emailId}).then((userValue)=>{// eki email bar bar registration korbe seta hoi na tai eta kor6i.
       
    //    if(userValue){
    //      console.log(userValue,"Email Already Exist");
    //      return res.redirect('/login');
    //    }else{
    //    //jodi same email na hoi ekhane password ta toiri korar time e strong password toiri hobe.
    //    return  bcrypt.hash(password,12)
    //    .then((hashPasword)=>{
    //     const Registration=new AuthModel({
    //       firstName:firstName,
    //       lastName:lastName,
    //       emailId:emailId,
    //       password:hashPasword   
    //   })
    //  return Registration.save()
    // }).then((result)=>{   
    //       console.log("Successfully Insterted Value",result)
    //       createTranspoter.sendMail({
    //         to:emailId,
    //         from:"sirshendukundu1994@gmail.com",
    //         subject:"registration ",
    //         html:"<h1>succefully.</h1>"
    //       })
    //      return  res.redirect('/login')
    //     }).catch(err=>{
    //       console.log("error not Inserted value",err);
    //     })
    //   }//else end
    //   }).catch((err)=>{
    //    console.log(err);
    //  })
    //--------------------------------------
    // let error=validationResult(req)
    //  if(!error.isEmpty()){
    //    errorResponce=validationResult(req).array();
    //    console.log(errorResponce);
    //    res.render('Auth/reg',{
    //      title:'registration page',
    //      path:'/reg',
    //      errMsg:'',
    //      cookie_data:req.cookies,
    //      error:errorResponce
    //    })
       
    //  }
     else{
      AuthModel.findOne({emailId:emailId}).then((userValue)=>{// eki email bar bar registration korbe seta hoi na tai eta kor6i.
       
           if(userValue){
             //console.log(userValue,"Email Already Exist");
             return res.status(401).json({
              success:false,
              message:"Email Already Exist"
             })
            // return res.redirect('/login');
           }
          
           return  bcrypt.hash(password,12)
           .then((hashPasword)=>{
            const Registration=new AuthModel({
              firstName:firstName,
              lastName:lastName,
              emailId:emailId,
              password:hashPasword   
          })
         return Registration.save()
      .then((results)=>{   
              //console.log("Successfully Insterted Value",result)
              return res.status(200).json({
                success:true,
                message:"Registration successful",
                result:results
               })
            //   createTranspoter.sendMail({
            //     to:emailId,
            //     from:"sirshendukundu1994@gmail.com",
            //     subject:"registration ",
            //     html:"<h1>succefully.</h1>"
            //   })
            //  return  res.redirect('/login')
            }).catch(err=>{
              //console.log("error not Inserted value",err);
              return res.status(401).json({
                success:false,
                message:err
              })
            })
       }).catch((err)=>{
           //console.log(err);
           return res.status(401).json({
            success:false,
            message:err
          })
         })
     }).catch((err)=>{
      //console.log(err);
      return res.status(401).json({
       success:false,
       message:err
     })
     })
    }
  }
    
//------------------------------------------------------------------------------------------    
// exports.getloginpage=(req,res)=>{//view login page
//   let message=req.flash('error');//check error message
//   console.log('massage');
//   if(message.length>0)
//   {
//     message=message[0];
//   }else{
//     message=null;
//   }
// res.render('Auth/login',
// {title:'login page',
// path:'/login',
// errMsg:message,
// cookie_data:req.cookies,//

// });

//  }

 exports.postloginpagevalue=(req,res)=>{
   console.log("body login value",req.body);
   const loginEmail=req.body.emailid;
   const loginPassword=req.body.password;
   //const checked=req.body.checkbox;
   if(!loginEmail){
     return res.status(401).json({
       success:false,
       message:"Email is required"
     })
   }
   else if(!loginPassword){
     return res.status(401).json({
       success:false,
       message:"password is required"
     })
   }
   console.log("Email",loginEmail,"password",loginPassword);
   AuthModel.findOne({emailId:loginEmail}).then((userValue)=>{//findOne()pre-define function,findOne korlei then r catch block er respect kag hobe.
     console.log(userValue);
     if(!userValue){
      // console.log("Invalid Email");
//req.flash('error','Error:: Invalid Email');// user ke error message shoe korar jonno
       //return res.redirect('/login')
       return res.status(401).json({
         success:false,
         message:"Invalid Email"
       })
     }
     return bcrypt .compare(loginPassword,userValue.password).then((result)=>{
      //  console.log(" invalied password",result);
      //  req.flash('error','invalid password')
      if(!result){
        return res.status(401).json({
          success:false,
          message:"Invalid Password"
        })
      }
       
       
       if(result){
        //console.log("Logged In",result);
        req.session.isLoggedIn=true;//isLoggedIn is a user defined variable in the session to check user is logged in or not
         req.session.user=userValue;//user is a variable in session to store logged in user value
         //-------------------------------------------------
         const token_jwt=jwt.sign({emailId:userValue.email},"ABCDE",{expiresIn:'1h'});  
         return req.session.save(result=>{
          return res.status(201).json({
            success:true,
            message:"Login successful",
            results:result,
            jwtToken:token_jwt
           })
          //  if(result){
          //    console.log(result);
          //  }
          //  else{
          //    if(checked){
          //      const cookiedata= {emailCookie:userValue.emailId,password:loginPassword};
          //      res.cookie('cookiedata',cookiedata,{
          //        expires:new Date(Date.now()+12000000),
          //        httpOnly:true
          //      }
          //      )
          //  }
          // }
          //  console.log('logged in');
          //  return res.redirect('/shop');
         })
       }
      // res.redirect('/login')
     }).catch((err)=>{
      return res.status(401).json({
        success:false,
        message:err
      })
      //  console.log("errorr in compare function",err);
      //  res.redirect('/login');
     })
   }).catch((err)=>{
    //  console.log("err in findOne",err);
    return res.status(401).json({
      success:false,
      message:err
    })
   })
 }

 exports.getlogout=(req,res)=>{
   req.session.destroy();
   console.log("Session Expired");
   res.redirect('/login')
  
 }
