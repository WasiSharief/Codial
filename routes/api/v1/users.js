const express = require('express');

const router = express.Router();

const postsApi = require('../../../controllers/api/v1/users_api');

router.post('/',postsApi.signin_createsession_control);


module.exports = router;