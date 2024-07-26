const express = require('express');

const {SignUp,SignIn,googleAuth} = require('../controller/auth');

const router = express.Router();

router.post("/signup",SignUp);
router.post("/signin",SignIn);
router.post("/google",googleAuth);

module.exports = router;