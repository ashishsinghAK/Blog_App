const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/verifyToken');
const {createPost} = require('../controller/createPost');

router.post('/create',verifyToken,createPost);

module.exports = router;