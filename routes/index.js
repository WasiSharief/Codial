const express = require('express');



const router = express.Router();
const app = express();

const homeController = require('../controllers/home_controller');


app.use(express.urlencoded());



router.get('/home',homeController.home);
router.use('/user',require('./user'));
router.use('/',require('./user'));

// router.use('/user/post',require('./post'));
// to add other router 
// router.use('/router',require('./routerfile'));

console.log("router is used");

module.exports = router;