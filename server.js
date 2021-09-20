require('dotenv').config();
const cors =require('cors');
const express_Server = require('express');

const create_Server = express_Server();
const path =require('path');
const cookieParser = require('cookie-parser');//cookie-parser import
const flash=require('connect-flash')//connect-flash import
//...................................................................................
const UserModel=require('./Model/authModel');//sesion step 4 er jonno import
//......................................................................................
//..................................................................
//step 1 for session
const ExSession=require('express-session');
//session package used to store info in memory but it has no infinite resourse.
const mongodb_session=require('connect-mongodb-session')(ExSession)
//use to store data in monbgodb in a session package.
//..................................................................
//const csurf=require('csurf');

//=========================================
const mongoose=require('mongoose');
//const dbDriver='mongodb+srv://data_kundu:sirshendu123@cluster0.13xzb.mongodb.net/ApiProductDatabase?retryWrites=true&w=majority'
//=========================================

const admin_Routing=require('./Router/adminRoute');
const shope_Routing=require('./Router/shopRoute');
const auth_Router=require('./Router/authRoute');

const multer= require('multer');//1 immage upload er jonno import kor6i

create_Server.use(express_Server.urlencoded());
create_Server.set('view engine','ejs');
create_Server.set('views','Views');
create_Server.use(express_Server.static(path.join(__dirname,'Public')));
//const csurfProtection=csurf();
//.........................................................................................
//step 2 for session 
//to store data in mongodb session collection
const storeValue=new mongodb_session({
    uri:'mongodb+srv://data_kundu:sirshendu123@cluster0.13xzb.mongodb.net/ProductDatabase',
collection:'my-new-session'
})

//step 3 for session
create_Server.use(ExSession({secret:'secret-key',resave:false,saveUninitialize:false,store:storeValue}))
//ExSession is fuction here. to stope resaving,resave value false. To stope storing uninitialize value,
//saveUninitialize:false,scret key help to generte id kind thing in session.
//..................................................................................................
//..................................................................................................
//for cors 
create_Server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

    next();
});
create_Server.use(cors());
//step 4 for session (last)
create_Server.use((req,res,next)=>{
    if(!req.session.user){
        return next()
    }
    UserModel.findById(req.session.user._id).then((uservalue)=>{
req.user=uservalue;
//console.log('app'+req.user);
next();
    }).catch((err)=>{
        console.log(err);
    })
});
//.................................................................................



create_Server.use(cookieParser());//cookie-paeser use
create_Server.use(flash());


create_Server.use('/image_Upload',express_Server.static(path.join(__dirname,'image_Upload')))//2 immage upload er jonno  to store image

const fileStorage= multer.diskStorage({// 3 immage upload er jonno  to use the image folder after adding it to database----database e store korar jonno multer. diskStorage()method dei
    destination:(req,file,callback)=>{
        callback(null,'image_Upload')
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname)
    }
});
const fileFilter=(req,file,callback)=>{
    if(file.mimetype.includes("png")|| file.mimetype.includes("jpg")||file.mimetype.includes("jpeg"))
    {
        callback(null,true)
    }
    else{
        callback(null,false)
    }
}
create_Server.use(multer({storage:fileStorage,fileFilter:fileFilter,limits:{fieldSize:1024*1024*5}}).single('productimmage'))
//create_Server.use(csurfProtection);//always after session and cookie.
create_Server.use((req,res,next)=>{
    res.locals.isAuthenticated=req.session.isLoggedIn;
   // res.locals.csrfToken=req.csrfToken();
    next();
})

create_Server.use(admin_Routing);
create_Server.use(shope_Routing);
create_Server.use(auth_Router);



create_Server.use((req,res)=>{
    res.send('<h1>PAGE LINK NOT FOUND!! Please Check It Once</h1>')
    })
    mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true,useUnifiedTopology: true}).then(result=>{
        console.log(result);
    create_Server.listen(process.env.PORT|| 1111,()=>{
      console.log(" Serverr is connected");
  });
      }).catch(err=>{
          console.log(err);
      })
//=================================================================================================
//   mongoose.connect(dbDriver,{useNewUrlParser: true,useUnifiedTopology: true}).then(result=>{
//       console.log(result);
//   create_Server.listen(1111,()=>{
//     console.log(" Serverr is connected");
// });
//     }).catch(err=>{
//         console.log(err);
//     })
//========================================================================================================