const express = require('express');

const router = express.Router();
const postAPi = require('../../../controllers/api/v2/posts_api');

router.get('/',postAPi.index);

module.exports = router;