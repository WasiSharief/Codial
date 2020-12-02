const express = require('express');
const router = express.Router();

const passport = require('passport');
const signin_controller = require('../controllers/sign_in_controller');
const signup = require('../controllers/sign_up_controller');
const userController = require('../controllers/user_profile_controller');





router.get('/profile/:id',passport.checkAuthentication,userController.user);
// userprofile page
router.get('/profile/user/profile/image',userController.image_preview);
router.post('/update/:id',passport.checkAuthentication,userController.profile_update);
// updating profile router
//user signin actions and page renders
router.get('/signin/page',signin_controller.signin_page_control);




router.post('/signin',passport.authenticate(
        'local',
        {failureRedirect:'/signin/page'},
),signin_controller.signin_createsession_control);


//user signup actions and page renders

router.get('/signup/page',signup.signup_page);
router.post('/signup/page/signup',signup.signup);
router.get('/signout',userController.endSession_signout);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/user/auth/google/callback', passport.authenticate('google',{failureRedirect:'/signin/page'}),signin_controller.signin_createsession_control);



module.exports = router;