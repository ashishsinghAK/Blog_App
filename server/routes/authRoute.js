const express = require('express');

const {SignUp} = require('../controller/auth');

const router = express.Router();

router.post("/signup",SignUp);

module.exports = router;