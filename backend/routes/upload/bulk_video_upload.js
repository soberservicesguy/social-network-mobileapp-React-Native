require('../../models/video');
require('../../models/comment');
require('../../models/like');
require('../../models/user');

const passport = require('passport');
const { isAllowedSurfing } = require('../authMiddleware/isAllowedSurfing')
const { isAllowedUploadingVideos } = require('../authMiddleware/isAllowedUploadingVideos')

const base64_encode = require('../../lib/image_to_base64')
const mongoose = require('mongoose');
const router = require('express').Router();
const Video = mongoose.model('Video');
const Comment = mongoose.model('Comment');
const Like = mongoose.model('Like');
const User = mongoose.model('User');

const multer = require('multer');
const path = require('path')

const fs = require('fs')

var ffmpeg = require('fluent-ffmpeg') // for setting thumbnail of video upload using snapshot


// bulk importing script
const sheet_to_class = require('../../excel_to_databases/import_bulkvideos')
const bulk_delete_all_videos = require('../../excel_to_databases/delete_all_videos')

var currentDate = ''
var currentTime = ''

// Set The Storage Engine
const bulk_videos_storage = multer.diskStorage({
	// destination: path.join(__dirname , '../../assets/bulk_videos/'),
	destination:function(req, file, cb){
		// let file_path = `./uploads/${type}`;
		currentDate = new Date().toLocaleDateString("en-US").split("/").join(" | ");
		currentTime = new Date().toLocaleTimeString("en-US").split("/").join(" | ");


		if (file.fieldname === "videos_to_upload") {

			let file_path = path.join(__dirname , '../../assets/bulk_videos/videos')
			cb(null, file_path)	

		} else {

			fs.mkdir( path.join(__dirname , `../../assets/bulk_videos/${currentDate}_${currentTime}`), { recursive: true }, (err) => {
				if (err) throw err;
			})
			
			let file_path = path.join(__dirname , `../../assets/bulk_videos/${currentDate}_${currentTime}`)
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

	if (file.fieldname === "videos_to_upload") {

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
const bulk_upload_videos = multer({
	storage: bulk_videos_storage,
	limits:{fileSize: 200000000}, // 1 mb
	fileFilter: function(req, file, cb){
		checkFileTypeForImageAndExcelSheet(file, cb);
	}
}).fields([
	{ name: 'videos_to_upload', maxCount: 1000 },
	{ name: 'excel_sheet_for_videos', maxCount: 1 }, 
])  // these are the fields that will be dealt
// .single('image_thumbnails'); 
// .array('photos', 12)


// create blogpost with undefined
// USED IN CREATING BLOGPOST
router.post('/bulk-upload-videos', passport.authenticate('jwt', { session: false }), isAllowedUploadingVideos, async function(req, res, next){
	
	// console.log('OUTER LOG')
	// console.log(req.body)

	bulk_upload_videos(req, res, async (err) => {
		if(err){

			console.log(err)

		} else {

			var uploaded_videos = req.files['videos_to_upload']

			let create_all_snapshot = await Promise.all(uploaded_videos.map((uploaded_video) => {
				if(uploaded_video == undefined){

					res.status(404).json({ success: false, msg: 'File is undefined!',file: `uploads/${uploaded_video.filename}`})

				} else {
					console.log('FILE NAME IS BELOW')
					console.log( path.extname(uploaded_video.filename) )
				// video is uploaded , NOW creating thumbnail from video using snapshot
	 				ffmpeg(`./assets/bulk_videos/videos/${uploaded_video.filename}`)
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
						folder: './assets/bulk_videos/thumbnails_images/',
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

				// // saving video in DB
				// 	video_id = new mongoose.Types.ObjectId()
				// 	const newVideo = new Video({
				// 		_id: video_id,
				// 		image_thumbnail: `${filename_used_to_store_video_in_assets_without_format}1.png`,
				// 		timestamp_of_uploading: String( Date.now() ),
				// 		video_filepath: `./assets/videos/uploads/videos_uploaded_by_users/${filename_used_to_store_video_in_assets}`,
				// 		category: req.body.category,
				// 		title: req.body.title,
				// 		all_tags: req.body.all_tags,
				// 		description: req.body.description,
				// 		// endpoint:String, // will be taken care at db model
				// 	})

				// 	newVideo.save(function (err, newVideo) {

				// 		if (err){
				// 			res.status(404).json({ success: false, msg: 'couldnt create video database entry'})
				// 			return console.log(err)
				// 		}

				// 		// assign user object then save
				// 		User.findOne({ phone_number: req.user.user_object.phone_number }) // using req.user from passport js middleware
				// 		.then((user) => {
				// 			if (user){

				// 				newVideo.user = user
				// 				newVideo.save()
				// 			// finding video saved to access its endpoint since its created at model level
								
				// 			} else {

				// 				res.status(200).json({ success: false, msg: "user doesnt exists, try logging in again" });

				// 			}
				// 		})
				// 		.then(() => {

				// 			Video.findOne({ _id: video_id })
				// 			.then((saved_video) => {
				// 				res.status(200).json({ success: true, msg: 'new user saved', video_endpoint: saved_video.endpoint});	

				// 			})

				// 		})
				// 		.catch((err) => {

				// 			next(err);

				// 		})

				// 		// not needed, used for multer
				// 		// res.status(200).json({ success: false, msg: 'couldnt create video database entry',file: `uploads/${req.file.filename}`})
				// 	})

				}

			}))
			.then(() => {

				// give excel file name and run bulk import function
				// req.files['excel_sheet_for_user'][0] // pull data from it and create users
				let user_id = ''
			// finding the user who is uploading so that it can be passed to sheet_to_class for assignment on posts
				User.findOne({ phone_number: req.user.user_object.phone_number }) // using req.user from passport js middleware
				.then((user) => {
					if (user){

						user_id = user._id
						// console.log( req.files['excel_sheet_for_socialpost'][0] )
						// give path
						let uploaded_excel_sheet = path.join(__dirname , `../../assets/bulk_videos/${currentDate}_${currentTime}/${req.files['excel_sheet_for_videos'][0].filename}`) 
						sheet_to_class( uploaded_excel_sheet, user_id )
						res.status(200).json({ success: true, msg: 'new videos created'});	

					} else {
						res.status(200).json({ success: false, msg: "new videos NOT created, try again" });
					}

				})
				.catch((error) => {
					res.status(200).json({ success: false, msg: "new videos NOT created, try again" });
				})
				// give excel file name and run bulk import function
				// req.files['excel_sheet_for_videos'][0] // pull data from it and create blogposts
			})

		}
	})
})


router.get('/bulk-delete-videos', passport.authenticate('jwt', { session: false }), isAllowedUploadingVideos, function(req, res, next){
	try{

		bulk_delete_all_videos()
		res.status(200).json({ success: true, msg: "all videos deleted" });

	} catch (err){

		res.status(200).json({ success: false, msg: err });

	}

})

module.exports = router;