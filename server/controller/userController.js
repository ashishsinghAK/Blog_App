const User = require('../model/userModel');

exports.deleteUser = async (req,res,next) => {
    if(req.user.id != req.params.userId){
        return res.status(403).json({
            success:false,
            message:"You are not authorised to delete this user"
        })
    }
    try{
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json("User has been deleted");
        
    }catch(err){
        return res.status(403).json({
            success:false,
            message:"error occured while deleting the account"
        })
    }
}

exports.SignOut = (req,res,next) => {
    try{
        res.clearCookie('token').status(200).json('User has been sign out')
    }catch(err){
        res.json({
            message:"Error occured while sign out"
        })
    }
}