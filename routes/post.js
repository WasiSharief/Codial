const express = require('express');
const router = express.Router();

const postController = require('../controllers/post_controller');
const passport = require('../config/passport-local-strategy');
const comment_controller = require('../controllers/comment_contr');
router.post('/post',passport.checkAuthentication,postController.post);
router.post('/comment',passport.checkAuthentication,comment_controller.comment);
module.exports = router;