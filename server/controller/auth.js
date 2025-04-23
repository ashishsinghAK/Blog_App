const bcrypt = require('bcrypt');
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.SignUp = async (req, res, next) => {
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
      message: 'sign up fail'
    })
  }


}


exports.SignIn = async (req, res, next) => {

  const {email,password } = req.body;
  if (!password || !email || password === '') {
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
        isAdmin:validUser.isAdmin
      };

      let token = jwt.sign(
        payload, process.env.JWT_SECRET
      )


      const { password, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
      })
      .json(rest);
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
      message: 'sign in fail'
    })
  }
}


exports.googleAuth = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const payload = {
        id: user._id,
        isAdmin:user.isAdmin
      };

      let token = jwt.sign(
        payload, process.env.JWT_SECRET
      )

      const { password, ...rest } = user._doc;
      
      res.status(200)
        .cookie('token', token, {
          httpOnly: true,
        })
        .json(rest);

    }

    else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      const newUser = new User({
        username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl
      })
      await newUser.save();
      const payload = {
        id: newUser._id,
        isAdmin:user.isAdmin
      };

      let token = jwt.sign(
        payload, process.env.JWT_SECRET
      )


      const { password, ...rest } = newUser._doc;
      
      res.status(200)
        .cookie('token', token, {
          httpOnly: true,
        })
        .json(rest);

    }


  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: 'goole authentication fail'
    })
  }
}