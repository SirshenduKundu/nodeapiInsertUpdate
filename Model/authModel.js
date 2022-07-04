const mongoose = require('mongoose');
const schemaVariable = mongoose.Schema;
const UserSchema = new schemaVariable({

    
    name: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage:{
             type:String,
            required:true
            }

})
module.exports = mongoose.model('User', UserSchema);
