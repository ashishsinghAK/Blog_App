const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/verifyToken');
const {createPost,getPost} = require('../controller/createPost');

router.post('/create',verifyToken,createPost);
router.get('/getpost',getPost);

module.exports = router;