const express = require('express');



const router = express.Router();
const app = express();

const homeController = require('../controllers/home_controller');


app.use(express.urlencoded());


router.use('/new',require('./post'));
router.get('/home',homeController.home);
router.use('/user',require('./user'));
router.use('/',require('./user'));
router.use('/api',require('./api'));
router.use('/password',require('./reset_ps_router'));

// router.use('/user/post',require('./post'));
// to add other router 
// router.use('/router',require('./routerfile'));

console.log("router is used");

module.exports = router;