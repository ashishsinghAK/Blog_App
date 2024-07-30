const express = require('express');

const router = express.Router();
const {createComment,getPostComment} = require('../controller/createComment');
const {verifyToken} = require('../middleware/verifyToken');

router.post('/create',verifyToken,createComment);
router.get('/getComment/:postId',getPostComment);


module.exports = router;