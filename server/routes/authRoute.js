const express = require('express');

const {SignUp,SignIn} = require('../controller/auth');

const router = express.Router();

router.post("/signup",SignUp);
router.post("/signin",SignIn);

module.exports = router;