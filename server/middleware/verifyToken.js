const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = (req,res,next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Unauthorised"
        })
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return res.status(401).json({
                success:false,
                message:"Unauthorised"
            })
        }
        req.user = user;
        next();
    })
}

// export const errorHandler = (statusCode, message) => {
//     const error = new Error();
//     error.statusCode = statusCode;
//     error.message = message;
//     return error;
//   };