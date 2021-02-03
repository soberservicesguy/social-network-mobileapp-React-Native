require('../../models/socialpost');
require('../../models/comment');
require('../../models/like');
require('../../models/user');

const passport = require('passport');
const { isAllowedSurfing } = require('../authMiddleware/isAllowedSurfing')
const { isAllowedCreatingPosts } = require('../authMiddleware/isAllowedCreatingPosts')

const base64_encode = require('../../lib/image_to_base64')
const mongoose = require('mongoose');
const router = require('express').Router();

const SocialPost = mongoose.model('SocialPost');

const Comment = mongoose.model('Comment');
const Like = mongoose.model('Like');
const User = mongoose.model('User');

const multer = require('multer');
const path = require('path')

const fs = require('fs')

// bulk importing script
const sheet_to_class = require('../../excel_to_databases/import_bulksocialposts')
const delete_all_socialposts = require('../../excel_to_databases/delete_all_socialposts')

var currentDate = ''
var currentTime = ''

// Set The Storage Engine
const bulk_posts_storage = multer.diskStorage({
	// destination: path.join(__dirname , '../../assets/bulk_socialposts/'),
	destination:function(req, file, cb){
		// let file_path = `./uploads/${type}`;
		currentDate = new Date().toLocaleDateString("en-US").split("/").join(" | ");
		currentTime = new Date().toLocaleTimeString("en-US").split("/").join(" | ");

		if (file.fieldname === "socialpost_image") {

			let file_path = path.join(__dirname , '../../assets/bulk_socialposts/images')
			cb(null, file_path)	

		} else if (file.fieldname === "socialpost_video") {

			let file_path = path.join(__dirname , '../../assets/bulk_socialposts/videos')
			cb(null, file_path)	

		} else {

			fs.mkdir( path.join(__dirname , `../../assets/bulk_socialposts/${currentDate}_${currentTime}`), { recursive: true }, (err) => {
				if (err) throw err;
			})
			
			let file_path = path.join(__dirname , `../../assets/bulk_socialposts/${currentDate}_${currentTime}`)
			cb(null, file_path)	

		}

	},
	filename: function(req, file, cb){
		// file name pattern fieldname-currentDate-fileformat
		// filename_used_to_store_image_in_assets_without_format = file.fieldname + '-' + Date.now()
		// filename_used_to_store_image_in_assets = filename_used_to_store_image_in_assets_without_format + path.extname(file.originalname)

		filename_used_to_store_image_in_assets = file.originalname
		cb(null, file.originalname);

	}
});

// Check File Type
function checkFileTypeForImageAndExcelSheet(file, cb){

	// Allowed ext
	let filetypes_for_image = /jpeg|jpg|png|gif/
	let filetypes_for_video = /mp4|mov|avi|flv/;
	// let filetypes_for_excelsheet = /xlsx|xls/
	let filetypes_for_excelsheet = /[A-Za-z]+/

	// Check ext
	let extname_for_image = filetypes_for_image.test( path.extname(file.originalname).toLowerCase() );
	let extname_for_video = filetypes_for_video.test( path.extname(file.originalname).toLowerCase() );
	let extname_for_excelsheet = filetypes_for_excelsheet.test( path.extname(file.originalname).toLowerCase() );

	// Check mime
	let mimetype_for_image = filetypes_for_image.test( file.mimetype );
	let mimetype_for_video = filetypes_for_video.test( file.mimetype );
	let mimetype_for_excelsheet = filetypes_for_excelsheet.test( file.mimetype );

	if (file.fieldname === "socialpost_image") { // if uploading resume
		
		if (mimetype_for_image && extname_for_image) {
			cb(null, true);
		} else {
			cb('Error: jpeg, jpg, png, gif Images Only!');
		}

	else if (file.fieldname === "socialpost_video") { // if uploading resume
		
		if (mimetype_for_video && extname_for_video) {
			cb(null, true);
		} else {
			cb('Error: mp4, mov, avi, flv videos Only!');
		}

	} else { // else uploading images

		if (mimetype_for_excelsheet && extname_for_excelsheet) {
			cb(null, true);
		} else {
			cb('Error: only .xlsx, .xls for excel files');
		}

	}

}

// Init Upload
const bulk_upload_socialposts = multer({
	storage: bulk_posts_storage,
	limits:{fileSize: 200000000}, // 1 mb
	fileFilter: function(req, file, cb){
		checkFileTypeForImageAndExcelSheet(file, cb);
	}
}).fields([
	{ name: 'excel_sheet_for_socialpost', maxCount: 1 }, 
	{ name: 'socialpost_image', maxCount: 1000 },
	{ name: 'socialpost_video', maxCount: 1000 },
])  // these are the fields that will be dealt
// .single('socialpost_image'); 
// .array('photos', 12)


// create blogpost with undefined
// USED IN CREATING BLOGPOST
router.post('/bulk-upload-socialposts', passport.authenticate('jwt', { session: false }), isAllowedCreatingPosts, function(req, res, next){
	
	// console.log('OUTER LOG')
	// console.log(req.body)

	bulk_upload_socialposts(req, res, (err) => {
		if(err){

			console.log(err)

		} else {
			var uploaded_videos = req.files['socialpost_video']

			let create_all_snapshot = await Promise.all(uploaded_videos.map((uploaded_video) => {
				if(uploaded_video == undefined){

					res.status(404).json({ success: false, msg: 'File is undefined!',file: `uploads/${uploaded_video.filename}`})

				} else {
					console.log('FILE NAME IS BELOW')
					console.log( path.extname(uploaded_video.filename) )
				// video is uploaded , NOW creating thumbnail from video using snapshot
	 				ffmpeg(`./assets/bulk_socialposts/videos/${uploaded_video.filename}`)
					// screenshots at mentioned times
					// .takeScreenshots({ 
					// 	count: 2, 
					// 	timemarks: [ '00:00:02.000', '6' ], 
					// 	filenames: [
					// 		`${filename_used_to_store_video_in_assets_without_format}1.png`, 
					// 		`${filename_used_to_store_video_in_assets_without_format}2.png`, 
					// 	],
					// 	size: '150x100', 
					// }, '../assets/videos/uploads/upload_thumbnails/')
					// screenshots at % completion ie 20%, 40%, 60%, 80%
					.screenshots({
						// filename: 'name-of-file.png', // if single snapshot is needed
						// timemarks: [ '00:00:02.000', '6' ], 
						// Will take screenshots at 20%, 40%, 60% and 80% of the video
						filename:`${uploaded_video.filename.replace( path.extname(uploaded_video.filename), "")}.png`,
						// filenames: [
						// 	`${uploaded_video.filename}1.png`, 
						// 	`${uploaded_video.filename}2.png`, 
						// 	`${uploaded_video.filename}3.png`, 
						// 	`${uploaded_video.filename}4.png`,
						// ],
						count: 4,
						size: '150x100', 
						folder: './assets/bulk_socialposts/thumbnails_images/',
					})
					.on('end', function() {
						console.log('Screenshots taken');
					})
					.on('error', function(err) {
						console.error(err);
					})
					.on('filenames', function(filenames) {
						console.log('screenshots are ' + filenames.join(', '));
					})

				}

			}))
			.then(() => {


				let user_id = ''
			// finding the user who is uploading so that it can be passed to sheet_to_class for assignment on posts
				User.findOne({ phone_number: req.user.user_object.phone_number }) // using req.user from passport js middleware
				.then((user) => {
					if (user){

						user_id = user._id
						// console.log( req.files['excel_sheet_for_socialpost'][0] )
						// give path
						let uploaded_excel_sheet = path.join(__dirname , `../../assets/bulk_socialposts/${currentDate}_${currentTime}/${req.files['excel_sheet_for_socialpost'][0].filename}`) 
						sheet_to_class( uploaded_excel_sheet, user_id )
						res.status(200).json({ success: true, msg: 'new socialposts created'});	

					} else {
						res.status(200).json({ success: false, msg: "new socialposts NOT created, try again" });
					}
				})
				.catch((error) => {
					res.status(200).json({ success: false, msg: "new socialposts NOT created, try again" });
				})


			})
		}
	})
})


router.get('/bulk-delete-socialposts', passport.authenticate('jwt', { session: false }), isAllowedCreatingPosts, function(req, res, next){
	
	try{

		delete_all_socialposts()
		res.status(200).json({ success: true, msg: "all socialposts deleted" });

	} catch (err){

		res.status(200).json({ success: false, msg: err });

	}

})

module.exports = router;