const mongoose=require('mongoose');
const schemaVariable=mongoose.Schema;
const LoginSchema=new schemaVariable({

    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    emailId:{type:String,
             required:true
    },
    password:{type:String,
              required:true
            }

})
module.exports=mongoose.model('Registration',LoginSchema);
