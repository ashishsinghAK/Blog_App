
const User = require('../model/userModel');

exports.Test = async (req,res) => {
  try{
    const {username,email} = req.body;
   
    const user = await User.create({
        username,email
    })

    console.log(user);

    return res.status(200).json({
        success:true,
        post:user
    })
  }

  catch (error) {
    console.log(error);
    res.status(400).json({
        success: false,
        message: 'something went wrong'
    })
  }
}