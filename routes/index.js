const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');



router.get('/home',homeController.home);
router.use('/user/profile',require('./user'));
// router.use('/user/post',require('./post'));
// to add other router 
// router.use('/router',require('./routerfile'));

console.log("router is used");

module.exports = router;