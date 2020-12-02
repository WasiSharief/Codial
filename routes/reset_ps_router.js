const express = require('express');
const resetpassword = require('../controllers/reset_password');
const router = express.Router();



router.get('/reset',resetpassword.reset);
router.post('/reset/email',resetpassword.emailsubmit);
router.get('/reset/link/:id',resetpassword.resetclickLink);
router.post('/newpassword/:id',resetpassword.createNewPassword);



module.exports = router;