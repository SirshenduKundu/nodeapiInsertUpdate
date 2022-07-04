require('dotenv').config();
const express_Server = require('express');
const create_Server = express_Server();
const path =require('path');
const mongoose=require('mongoose');
const multer= require('multer');//1 immage upload

const auth_Router=require('./Router/authRoute');

create_Server.use(express_Server.urlencoded());
create_Server.set('view engine','ejs');
create_Server.set('views','Views');
create_Server.use(express_Server.static(path.join(__dirname,'Public')));
create_Server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

    next();
});

create_Server.use('/image_Upload',express_Server.static(path.join(__dirname,'image_Upload')))//2 immage upload er jonno  to store image
const fileStorage= multer.diskStorage({
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
const maxSize= 2 * 1024 * 1024;

create_Server.use(multer({storage:fileStorage,fileFilter:fileFilter,limits:{ fileSize: maxSize }}).single('profileImage'))
function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: false,
            'File Size is too large.Allowed file size is MAX 2MB': err.message
        })
    }
}
create_Server.use(errHandler);

create_Server.use(auth_Router);


create_Server.use((req,res)=>{
    res.send('<h1>PAGE LINK NOT FOUND!! Please Check It Once</h1>')
    })
    mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true,useUnifiedTopology: true}).then(result=>{
        console.log(result);
    create_Server.listen(process.env.PORT|| 1112,()=>{
      console.log(" Serverr is connected");
  });
      }).catch(err=>{
          console.log(err);
      })
