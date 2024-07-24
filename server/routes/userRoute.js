const express  = require('express');

const router = express.Router();

const {Test}  = require('../controller/Test');

//mapping


router.post("/test",Test);


module.exports = router;