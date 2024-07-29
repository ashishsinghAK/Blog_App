const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/verifyToken');
const {createPost,getPost,deletePost} = require('../controller/createPost');

router.post('/create',verifyToken,createPost);
router.get('/getpost',getPost);
router.delete('/deletepost/:postId/:userId',verifyToken,deletePost);

module.exports = router;