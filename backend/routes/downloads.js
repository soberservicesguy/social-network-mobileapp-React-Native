const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../lib/utils');

// const path = require('path');

router.post('/protected-download', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	let filePath = "/my/file/path/..." // Or format the path using the `id` rest param
	let fileName = "report.pdf" // The default name the browser will use

	res.download(filePath, fileName);
})

module.exports = router