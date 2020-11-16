const express = require('express');
const router = express.Router();

const passport = require('passport');
const signin_controller = require('../controllers/sign_in_controller');
const signup = require('../controllers/sign_up_controller');
const userController = require('../controllers/user_profile_controller');





router.get('/profile',passport.checkAuthentication,userController.user);
//user signin actions and page renders
router.get('/signin/page',signin_controller.signin_page_control);




router.post('/signin',passport.authenticate(
        'local',
        {failureRedirect:'/signin/page'},
),signin_controller.signin_createsession_control);


//user signup actions and page renders
router.get('/signup/page',signup.signup_page);
router.post('/signup/page/signup',signup.signup);

module.exports = router;