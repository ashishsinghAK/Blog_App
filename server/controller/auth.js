const bcrypt = require('bcrypt');
const User = require('../model/userModel');

exports.SignUp = async (req,res) => {
  try{
    const {username,email,password} = req.body;
    if(!username || !email || !password || username==='' || email==='' || !password===''){
        return res.status(400).json({
           message:"Required all the fields !"
        })
    }

   
    else{
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({
            username,
            email,
            password:hashedPassword
        });

        await user.save();
        res.status(200).json({
            success:true,
            message:"user created successfully",
            data:user
        })

    }

  }
  catch(error){
    console.log(error);
    res.status(400).json({
        success: false,
        message: 'something went wrong'
    })
  }


}