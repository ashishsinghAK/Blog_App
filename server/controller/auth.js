const bcrypt = require('bcrypt');
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.SignUp = async (req, res,next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === '' || email === '' || !password === '') {
      return res.status(400).json({
        message: "Required all the fields !"
      })
    }

    else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        email,
        password: hashedPassword
      });

      await user.save();
      res.status(200).json({
        success: true,
        message: "user created successfully",
        data: user
      })

    }

  }
  catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: 'something went wrong'
    })
  }


}


exports.SignIn = async (req, res,next) => {

  const {username, password, email } = req.body;
  if (!password || username === '' || password === '') {
    return res.status(400).json({
      success: false,
      message: "Required all the fields !"
    })
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(400).json({
        success: false,
        message: "Not a valid user"
      })
    }

    if (await bcrypt.compare(password, validUser.password)) {
      const payload = {
        id: validUser._id,
      };

      let token = jwt.sign(
        payload, process.env.JWT_SECRET,{
          expiresIn: "1h"
      })
      res.status(200).cookie('token',token,{httpOnly:true}).json({
        success:true,
        message:'Sign in successfull'
      })
    }
    else {
      return res.status(400).json({
        success: false,
        message: "Please enter valid password"
      })
    }
  }
  catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: 'something went wrong'
    })
  }
}