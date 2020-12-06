const express = require('express');
const router = express.Router();
const liketoggle = require('../controllers/likes_controller');

router.get('/toggle/',liketoggle.toggleliker);

module.exports = router;