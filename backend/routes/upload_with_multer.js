const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../lib/utils');

const multer = require('multer');
const path = require('path');

// Set The Storage Engine
const image_storage = multer.diskStorage({
	destination: '../assets/images/uploads/',
	filename: function(req, file, cb){
		// file name pattern fieldname-currentDate-fileformat
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

// Init Upload
const image_upload = multer({
	storage: image_storage,
	limits:{fileSize: 1000000},
	fileFilter: function(req, file, cb){
		checkFileTypeForImage(file, cb);
	}
}).single('myImage');

// Check File Type
function checkFileTypeForImage(file, cb){
	// Allowed ext
	const filetypes = /jpeg|jpg|png|gif/;
	// Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	const mimetype = filetypes.test(file.mimetype);

	if(mimetype && extname){
		return cb(null,true);
	} else {
		cb('Error: Images Only!');
	}
}

// app.post('/upload', (req, res) => {
// 	upload(req, res, (err) => {
// 		if(err){
// 			res.render('index', {
// 				msg: err
// 			});
// 		} else {
// 			if(req.file == undefined){
// 				res.render('index', {
// 					msg: 'Error: No File Selected!'
// 				});
// 			} else {
// 				res.render('index', {
// 					msg: 'File Uploaded!',
// 					file: `uploads/${req.file.filename}`
// 				});
// 			}
// 		}
// 	});
// });

router.post('/protected-image-upload', passport.authenticate('jwt', { session: false }), (req, res, next) => {

	image_upload(req, res, (err) => {
		if(err){

			console.log(err)

		} else {

			if(req.file == undefined){

				res.status(404).json({ success: false, msg: 'File is undefined!',file: `uploads/${req.file.filename}`})

			} else {

				res.status(200).json({ success: true, msg: 'File Uploaded!',file: `uploads/${req.file.filename}`})

			}
		}
	})

})

module.exports = router