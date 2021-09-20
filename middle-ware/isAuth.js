// module.exports=(req,res)=>{
//     if(!req.session.isLoggedin)
//     {
//         res.redirect('/login')
//     }
// }
const jwt = require('jsonwebtoken');//jwt import
module.exports = (req,res,next)=>{ 
    const authHeader = req.get('Authorization');

    if(!authHeader){
        const error =new Error('Not Authenticated');
        error.statusCode= 401;
        throw error;
    }

// const token = authHeader.split(' ')[1];  //its use for bearer
const token = authHeader.split()[0];
let decodeToken;

try{
    decodeToken = jwt.verify(token,'ABCDE');
}
catch(err){
    err.statusCode = 500;
    throw err;
}

if(!decodeToken){
    const error = new Error('Not Authorize');
    error.statusCode  = 401;
    throw error;
}

req.email = decodeToken.email;
next()
}