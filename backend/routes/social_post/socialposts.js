require('../../models/socialpost');
require('../../models/comment');
require('../../models/like');
require('../../models/share');
require('../../models/user');

const passport = require('passport');
const { isAllowedSurfing } = require('../authMiddleware/isAllowedSurfing')
const { isAllowedCreatingPosts } = require('../authMiddleware/isAllowedCreatingPosts')
const { isAllowedInteractingWithOthersPosts } = require('../authMiddleware/isAllowedInteractingWithOthersPosts')


const base64_encode = require('../../lib/image_to_base64')
const mongoose = require('mongoose');
const router = require('express').Router();
const SocialPost = mongoose.model('SocialPost');
const Comment = mongoose.model('Comment');
const Like = mongoose.model('Like');
const Share = mongoose.model('Share');
const User = mongoose.model('User');


require('../../models/activity');
const Activity = mongoose.model('Activity');


const multer = require('multer');
const path = require('path')

var ffmpeg = require('fluent-ffmpeg') // for setting thumbnail of video upload using snapshot

const images_upload_path = path.join(__dirname , '../../assets/images/uploads/social_images')
const video_upload_path = path.join(__dirname , `../../assets/videos/uploads/social_videos`)
const video_image_thumbnail_path = path.join(__dirname , `../../assets/videos/uploads/thumbnails_for_social_videos`)

// Set The Storage Engine
const image_and_video_storage = multer.diskStorage({
	destination:function(req, file, cb){
		// let file_path = `./uploads/${type}`;
		currentDate = new Date().toLocaleDateString("en-US").split("/").join(" | ");
		currentTime = new Date().toLocaleTimeString("en-US").split("/").join(" | ");

		if (file.fieldname === "image_upload") {

			let file_path = images_upload_path
			cb(null, file_path)	

		} else {
			
			let file_path = video_upload_path
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
function checkFileTypeForImageAndVideo(file, cb){
	// Allowed ext
	let filetypes_for_image = /jpeg|jpg|png|gif/
	// let filetypes_for_video = /xlsx|xls/
	let filetypes_for_video = /mp4|mov|avi|flv/;

	// Check ext
	let extname_for_image = filetypes_for_image.test( path.extname(file.originalname).toLowerCase() );
	let extname_for_video = filetypes_for_video.test( path.extname(file.originalname).toLowerCase() );

	// Check mime
	let mimetype_for_image = filetypes_for_image.test( file.mimetype );
	let mimetype_for_video = filetypes_for_video.test( file.mimetype );

	if (file.fieldname === "image_upload") { // if uploading resume
		
		if (mimetype_for_image && extname_for_image) {
			cb(null, true);
		} else {
			cb('Error: jpeg, jpg, png, gif Images Only!');
		}

	} else { // else uploading images

		if (mimetype_for_video && extname_for_video) {
			cb(null, true);
		} else {
			cb('Error: mp4, mov, avi, flv Videos Only!');
		}

	}

}

// Init Upload
const upload_image_or_video_in_social_post = multer({
	storage: image_and_video_storage,
	limits:{fileSize: 200000000}, // 1 mb
	fileFilter: function(req, file, cb){
		checkFileTypeForImageAndExcelSheet(file, cb);
	}
}).fields([
	{ name: 'image_upload', maxCount: 1 }, 
	{ name: 'video_upload', maxCount: 1 }
])  // these are the fields that will be dealt
// .single('blogpost_image_main'); 
// .array('photos', 12)

function create_snapshots_from_uploaded_video(video_file, snapshot_name){
// video is uploaded , NOW creating thumbnail from video using snapshot
	ffmpeg(video_file)
	.on('end', function() {
		console.log('Screenshots taken');
	})
	.on('error', function(err) {
		console.error(err);
	})
	.on('filenames', function(filenames) {
		console.log('screenshots are ' + filenames.join(', '));
	})
	.screenshots({
		count: 4,
		filenames: [
			`${snapshot_name}1.png`, 
			`${snapshot_name}2.png`, 
			`${snapshot_name}3.png`, 
			`${snapshot_name}4.png`,
		],
		size: '150x100', 
		// folder: './assets/videos/uploads/upload_thumbnails/',
		folder: video_image_thumbnail_path,
	})
}


// create blogpost with undefined
// USED IN CREATING BLOGPOST
router.post('/create-socialpost-with-user', passport.authenticate('jwt', { session: false }), isAllowedCreatingPosts, function(req, res, next){
	
	// console.log('OUTER LOG')
	// console.log(req.body)
	const social_post_id = ''
	const social_post_type = ''

	upload_image_or_video_in_social_post(req, res, (err) => {
		if(err){

			console.log(err)

		} else {

			if(req.file == undefined){

				res.status(404).json({ success: false, msg: 'File is undefined!',file: `uploads/${req.file.filename}`})

			} else {
				// console.log('INNER LOG')
				// console.log(req.body)

			// image is uploaded , now saving image in db
			// check whether image uploaded or video through their fields
			
				social_post_id = new mongoose.Types.ObjectId()
				let image_path = ''
				let video_path = ''

				if (req.files['image_upload'][0] && req.body.parent.post_text){

					social_post_type = 'text_with_image_post'
					image_path = path.join(image_upload_path, `${req.files['image_upload'][0].filename}`)
					const newSocialPost = new SocialPost({
						_id: social_post_id,
						type_of_post: social_post_type,
						post_text: req.body.parent.post_text,
						image_for_post: image_path,
					});

				} else if (req.files['image_upload'][0] && !req.body.parent.post_text){

					social_post_type = 'image_post'
					image_path = path.join(image_upload_path, `${req.files['image_upload'][0].filename}`)
					const newSocialPost = new SocialPost({

						_id: social_post_id,
						type_of_post: social_post_type,
						image_for_post: image_path,
					});

				} else if (req.files['video_upload'][0] && req.body.parent.post_text){

					video_path = path.join(video_upload_path, `${req.files['video_upload'][0].filename}`)
					create_snapshots_from_uploaded_video(video_file_path, filename_used_to_store_video_in_assets_without_format)
					social_post_type = 'text_with_video_post'

					const newSocialPost = new SocialPost({
						_id: social_post_id,
						type_of_post: social_post_type,
						post_text: req.body.parent.post_text,
						video_for_post: video_path,
						video_thumbnail_image: filename_used_to_store_video_in_assets_without_format,
					});

				} else if (req.files['video_upload'][0] && !req.body.parent.post_text){
					
					video_path = path.join(video_upload_path, `${req.files['video_upload'][0].filename}`)
					create_snapshots_from_uploaded_video(video_file_path, filename_used_to_store_video_in_assets_without_format)
					social_post_type = 'video_post'

					const newSocialPost = new SocialPost({
						_id: social_post_id,
						type_of_post: social_post_type,
						video_for_post: video_path,
						video_thumbnail_image: filename_used_to_store_video_in_assets_without_format,
					});

				} else {

					social_post_type = 'text_post'
					const newSocialPost = new SocialPost({
						_id: social_post_id,
						type_of_post: social_post_type,
						post_text: req.body.parent.post_text,
					});

				}


// DONE ABOVE BETTER 
				// if ( req.files['image_upload'][0] ){

				// 	let image_path = path.join(image_upload_path, `${req.files['image_upload'][0].filename}`)

				// 	if (req.body.parent.post_text ){

				// 		social_post_type = 'text_with_image_post'

				// 		const newSocialPost = new SocialPost({

				// 			_id: social_post_id,
				// 			type_of_post: social_post_type,
				// 			post_text: req.body.parent.post_text,
				// 			image_for_post: image_path,
				// 			// image_for_post: `../../assets/images/uploads/social_images/${req.files['image_upload'][0].filename}`,
				// 			// video_for_post: req.body.parent.video_for_post,
				// 			// video_thumbnail_image: req.body.parent.video_thumbnail_image,
				// 			// endpoint: req.body.parent.endpoint,
				// 			// timestamp: req.body.parent.timestamp,

				// 		});

				// 	} else {

				// 		social_post_type = 'image_post'

				// 		const newSocialPost = new SocialPost({

				// 			_id: social_post_id,
				// 			type_of_post: social_post_type,
				// 			// post_text: req.body.parent.post_text,
				// 			image_for_post: image_path,
				// 			// image_for_post: `../../assets/images/uploads/social_images/${req.files['image_upload'][0].filename}`,
				// 			// video_for_post: req.body.parent.video_for_post,
				// 			// video_thumbnail_image: req.body.parent.video_thumbnail_image,
				// 			// endpoint: req.body.parent.endpoint,
				// 			// timestamp: req.body.parent.timestamp,

				// 		});

				// 	}



				// } else if ( req.files['video_upload'][0] ){

				// 	let video_path = path.join(video_upload_path, `${req.files['video_upload'][0].filename}`)

				// 	create_snapshots_from_uploaded_video(video_file_path, filename_used_to_store_video_in_assets_without_format)

				// 	if ( req.body.parent.post_text ){

				// 		social_post_type = 'text_with_video_post'

				// 		const newSocialPost = new SocialPost({

				// 			_id: social_post_id,
				// 			type_of_post: social_post_type,
				// 			post_text: req.body.parent.post_text,
				// 			// image_for_post: req.body.parent.image_for_post,
				// 			video_for_post: video_path,
				// 			// video_for_post: `../../assets/images/uploads/social_images/${req.files['video_upload'][0].filename}`,
				// 			video_thumbnail_image: filename_used_to_store_video_in_assets_without_format,
				// 		});

				// 	} else {

				// 		social_post_type = 'video_post'

				// 		const newSocialPost = new SocialPost({

				// 			_id: social_post_id,
				// 			type_of_post: social_post_type,
				// 			// post_text: req.body.parent.post_text,
				// 			// image_for_post: req.body.parent.image_for_post,
				// 			video_for_post: video_path,
				// 			// video_for_post: `../../assets/images/uploads/social_images/${req.files['video_upload'][0].filename}`,
				// 			video_thumbnail_image: filename_used_to_store_video_in_assets_without_format,
						
				// 		});

				// 	}

				// } else {

				// 	social_post_type = 'text_post'

				// 	const newSocialPost = new SocialPost({

				// 		_id: social_post_id,
				// 		type_of_post: social_post_type,
				// 		post_text: req.body.parent.post_text,
				// 		// image_for_post: req.body.parent.image_for_post,
				// 		// video_for_post: req.body.parent.video_for_post,
				// 		// video_thumbnail_image: req.body.parent.video_thumbnail_image,

				// 	});

				// }


				newSocialPost.save(function (err, newSocialPost) {

					if (err){
						res.status(404).json({ success: false, msg: 'couldnt create socialpost database entry'})
						return console.log(err)
					}
					// assign user object then save
					User.findOne({ phone_number: req.user.user_object.phone_number }) // using req.user from passport js middleware
					.then((user) => {
						if (user){

							newSocialPost.user = user
							newSocialPost.save()

							let new_socialpost = {}
							let socialpost_endpoint = ''

							switch (social_post_type) {
								case "text_post":

									new_socialpost = {
										type_of_post: newSocialPost.type_of_post,
										post_text: newSocialPost.type_of_post,
									}

									res.status(200).json({ success: true, msg: 'new social post saved', new_socialpost: new_socialpost});
									break

								case "image_post":

									new_socialpost = {
										type_of_post: newSocialPost.type_of_post,
										image_for_post: base64_encode(newSocialPost.image_for_post),
									}

									res.status(200).json({ success: true, msg: 'new social post saved', new_socialpost: new_socialpost});	
									break

								case "text_with_image_post":

									new_socialpost = {
										type_of_post: newSocialPost.type_of_post,
										image_for_post: base64_encode(newSocialPost.image_for_post),
										post_text: newSocialPost.type_of_post,
									}

									res.status(200).json({ success: true, msg: 'new social post saved', new_socialpost: new_socialpost});	
									break

								case "video_post":

									SocialPost.findOne({ _id: social_post_id })
									.then((saved_socialpost) => {
										socialpost_endpoint = saved_socialpost.endpoint
									})
									.then(() => {

										new_socialpost = {
											type_of_post: newSocialPost.type_of_post,
											video_thumbnail_image: base64_encode(newSocialPost.video_thumbnail_image),
											video_for_post: newSocialPost.video_for_post,
										}

										res.status(200).json({ success: true, msg: 'new social post saved', socialpost_endpoint: socialpost_endpoint, new_socialpost: new_socialpost});	

									})

									break


								case "text_with_video_post":

									SocialPost.findOne({ _id: social_post_id })
									.then((saved_socialpost) => {
										socialpost_endpoint = saved_socialpost.endpoint
									})
									.then(() => {

										new_socialpost = {
											post_text: newSocialPost.type_of_post,
											type_of_post: newSocialPost.type_of_post,
											video_thumbnail_image: base64_encode(newSocialPost.video_thumbnail_image),
											video_for_post: newSocialPost.video_for_post,
										}

										res.status(200).json({ success: true, msg: 'new social post saved', socialpost_endpoint: socialpost_endpoint, new_socialpost: new_socialpost});	

									})
									break


								default:
									null

							}

							let newActivity = new Activity({
								_id: new mongoose.Types.ObjectId(),
								user: user,
								activity_type: 'created_post',
								post_created: newSocialPost,
							})
							newActivity.save()
							user.activities.push(newActivity)
							user.save()
							

						} else {

							res.status(200).json({ success: false, msg: "couldnt save social post" });

						}
					})
					.catch((err) => {

						next(err);

					});

				})

				// not needed, this is used only in multer
				// res.status(200).json({ success: true, msg: 'File Uploaded!',file: `uploads/${req.file.filename}`})
			}
		}
	})
})


async function get_post_details(type_of_post, post_created, post_details){

	switch (type_of_post) {
		case "text_post":
			var { post_text } = post_created
			post_details = { ...post_details, post_text }
			break

		case "image_post":
			var { image_for_post } = post_created
			post_details = { ...post_details, image_for_post }
			break

		case "video_post":
			var { video_for_post, video_thumbnail_image } = post_created
			post_details = { ...post_details, video_for_post, video_thumbnail_image }									
			break

		case "text_with_image_post":
			var { post_text, image_for_post } = post_created
			post_details = { ...post_details, post_text, image_for_post }									
			break

		case "text_with_video_post":
			var { post_text, video_for_post, video_thumbnail_image } = post_created
			post_details = { ...post_details, post_text, video_for_post, video_thumbnail_image }									
			break

		default:
			null
	}

	return post_details
}

// USED 
// get posts from friends for wall
router.get('/get-socialposts-from-friends', passport.authenticate('jwt', { session: false }), async function(req, res, next){

	try{

		let user_checking_others_posts = await User.findOne({ phone_number: req.user.user_object.phone_number }).populate('friends') // using req.user from passport js middleware
		let { friends, last_timestamp_of_checking_notification } =  user_checking_others_posts

		let activities_to_send = []


		let all_friends = await Promise.all(friends.map(async (friend) => {

			// access friend data here
			let { user_name, user_avatar_image } = friend
			let friend_endpoint = friend.endpoint

			let all_activities = await Promise.all(friend.activities.map(async (activity) => {
				
				activity = await Activity.findOne({_id: activity})

				let post_details = {}
				post_details = { user_name, user_avatar_image, friend_endpoint }

				if ( last_timestamp_of_checking_notification !== null && timestamp.activity > last_timestamp_of_checking_notification ){

					let { activity_type } = activity

					switch (activity_type) {
						case "created_post":

							var { post_created } = activity
							post_created = await SocialPost.findOne({_id: post_created})
							var { type_of_post, total_likes, total_shares, total_comments, endpoint } = post_created
							post_details = { ...post_details, activity_type, type_of_post, total_likes, total_shares, total_comments, endpoint }
// DRYed out
							// switch (type_of_post) {
							// 	case "text_post":
							// 		let { post_text } = post_created
							// 		post_details = { ...post_details, post_text }
							// 		break
							// 	case "image_post":
							// 		let { image_for_post } = post_created
							// 		post_details = { ...post_details, image_for_post }
							// 		break
							// 	case "video_post":
							// 		let { video_for_post, video_thumbnail_image } = post_created
							// 		post_details = { ...post_details, video_for_post, video_thumbnail_image }									
							// 		break
							// 	case "text_with_image_post":
							// 		let { post_text, image_for_post } = post_created
							// 		post_details = { ...post_details, post_text, image_for_post }									
							// 		break
							// 	case "text_with_video_post":
							// 		let { post_text, video_for_post, video_thumbnail_image } = post_created
							// 		post_details = { ...post_details, post_text, video_for_post, video_thumbnail_image }									
							// 		break
							// 	default:
							// 		null
							// }			
							post_details = await get_post_details(type_of_post, post_created, post_details)
							activities_to_send.push(post_details)
							break

						case "liked_post":

							var { post_liked } = activity
							post_liked = await SocialPost.findOne({_id: post_liked})
							var { type_of_post, total_likes, total_shares, total_comments, endpoint } = post_liked
							post_details = { ...post_details, activity_type, type_of_post, total_likes, total_shares, total_comments, endpoint }
							post_details = await get_post_details(type_of_post, post_created, post_details)
							activities_to_send.push(post_details)
							break

						case "shared_post":

							var { post_share } = activity
							post_share = await SocialPost.findOne({_id: post_share})
							var { type_of_post, total_likes, total_shares, total_comments, endpoint } = post_share
							post_details = { ...post_details, activity_type, type_of_post, total_likes, total_shares, total_comments, endpoint }
							post_details = await get_post_details(type_of_post, post_created, post_details)
							activities_to_send.push(post_details)
							break

						case "commented_on_post":

							var { post_commented } = activity
							post_commented = await Comment.findOne({_id: post_commented})
							let original_post = post_commented.socialpost
							original_post = await SocialPost.findOne({_id: original_post})
							var { comment_text } = post_commented
							var { type_of_post, total_likes, total_shares, total_comments, endpoint } = original_post
							post_details = { ...post_details, activity_type, comment_text, type_of_post, total_likes, total_shares, total_comments, endpoint }
							post_details = await get_post_details(type_of_post, post_created, post_details)
							activities_to_send.push(post_details)
							break

						case "created_book":

							let { book_created } = activity
							book_created = await Book.findOne({_id: book_created})
							var { book_name, book_image, book_description, interested_users, endpoint } = book_created
							post_details = { ...post_details, activity_type, book_name, book_image, book_description, endpoint }
							activities_to_send.push(post_details)
							break

						case "got_interested_in_book":

							let { book_liked } = activity
							book_liked = await Book.findOne({_id: book_liked})
							var { book_name, book_image, book_description, endpoint } = book_liked
							post_details = { ...post_details, activity_type, book_name, book_image, book_description, endpoint }
							activities_to_send.push(post_details)
							break

						case "created_page":

							let { page_created } = activity
							page_created = await Page.findOne({_id: page_created})
							var { page_name, page_image, page_description, endpoint } = page_created
							post_details = { ...post_details, activity_type, page_name, page_image, page_description, endpoint }
							activities_to_send.push(post_details)
							break

						case "got_interested_in_page":

							let { page_liked } = activity
							page_liked = await Page.findOne({_id: page_liked})
							var { page_name, page_image, page_description, endpoint } = page_liked
							post_details = { ...post_details, activity_type, page_name, page_image, page_description, endpoint }
							activities_to_send.push(post_details)
							break

						case "created_sport":

							let { sport_created } = activity
							sport_created = await Sport.findOne({_id: sport_created})
							var { sport_name, sport_image, sport_description, endpoint } = sport_created
							post_details = { ...post_details, activity_type, sport_name, sport_image, sport_description, endpoint }
							activities_to_send.push(post_details)
							break

						case "got_interested_in_sport":

							let { sport_liked } = activity
							sport_liked = await Sport.findOne({_id: sport_liked})
							var { sport_name, sport_image, sport_description, endpoint } = sport_created
							post_details = { ...post_details, activity_type, sport_name, sport_image, sport_description, endpoint }
							activities_to_send.push(post_details)
							break

						case "created_advertisement":

							let { ad_created } = activity
							ad_created = await Advertisement.findOne({_id: ad_created})
							var { ad_name, ad_image, ad_description, endpoint } = ad_created
							post_details = { ...post_details, activity_type, ad_name, ad_image, ad_description, endpoint }
							activities_to_send.push(post_details)
							break

						case "got_interested_in_advertisement":

							let { ad_liked } = activity
							ad_liked = await Advertisement.findOne({_id: ad_liked})
							var { ad_name, ad_image, ad_description, endpoint } = ad_liked
							post_details = { ...post_details, activity_type, ad_name, ad_image, ad_description, endpoint }
							activities_to_send.push(post_details)
							break

						default:
							null
					}
				}
			}))
		}))

		res.status(200).json(activities_to_send)

	} catch (err) {

		console.log(err)

	}
})

// get socialposts_list_with_children
// USED
router.get('/socialposts-list-with-children', function(req, res, next){
	console.log('triggered')

	SocialPost.
	find().
	limit(10).
	populate('comments').
	populate('likes').
	populate('shares').
	populate('user').
	then((socialposts) => {

		var newSocialPosts_list = []

		socialposts.map((socialpost, index)=>{

			var newSocialPost = {}

			newSocialPost.type_of_post = socialpost[ 'type_of_post' ]
			// newSocialPost.post_text = socialpost[ 'post_text' ]
			// newSocialPost.image_for_post = base64_encode( socialpost[ 'image_for_post' ] )
			// newSocialPost.video_thumbnail_image = base64_encode( socialpost[ 'video_thumbnail_image' ] )
			( socialpost[ 'post_text' ] !== null ) ? newSocialPost.post_text = socialpost[ 'post_text' ] : null
			( socialpost[ 'image_for_post' ] !== null ) ? newSocialPost.image_for_post = base64_encode( socialpost[ 'image_for_post' ] ) : null
			( socialpost[ 'video_for_post' ] !== null ) ? newSocialPost.video_for_post = socialpost[ 'video_for_post' ] : null
			( socialpost[ 'video_thumbnail_image' ] !== null ) ? newSocialPost.video_thumbnail_image = base64_encode( socialpost[ 'video_thumbnail_image' ] ) : null

			newSocialPost.total_likes = socialpost[ 'total_likes' ]
			newSocialPost.total_shares = socialpost[ 'total_shares' ]
			newSocialPost.endpoint = socialpost[ 'endpoint' ]
			newSocialPost.timestamp = socialpost[ 'timestamp' ]

			newSocialPosts_list.push({...newSocialPost})
			newSocialPost = {}
		});

		return newSocialPosts_list
	})
	.then((newSocialPosts_list) => {

		if (!newSocialPosts_list) {

			res.status(401).json({ success: false, msg: "could not find SocialPosts_list" });

		} else {

			res.status(200).json(newSocialPosts_list);

		}

	})
	.catch((err) => {

		next(err);

	});

});


// USED FOR CREATING COMMENT
router.post('/create-comment-for-socialpost', passport.authenticate('jwt', { session: false }), isAllowedInteractingWithOthersPosts, function(req, res, next){

	var comment_text = req.body.comment_text	
	var socialpost_endpoint = req.body.socialpost_endpoint

	var newComment = new Comment({
		_id: new mongoose.Types.ObjectId(),
		text:comment_text,
	})

	User.findOne({ phone_number: req.user.user_object.phone_number })
	.then((user) => {
					
		newComment.user = user

	// finding BlogPost object
		SocialPost.findOne({endpoint: socialpost_endpoint})
		.then((socialpost) => {

			socialpost.comments.push( newComment )

			newComment.socialpost = socialpost
			
			newComment.save(function (err, newComment) {
				if (err) return console.log(err);
			})

			socialpost.save((err, socialpost) => res.status(200).json(socialpost) )


			let newActivity = new Activity({
				_id: new mongoose.Types.ObjectId(),
				user: user,
				activity_type: 'commented_on_post',
				post_commented: newComment,
			})
			newActivity.save()
			user.activities.push(newActivity)
			user.save()


		})
		.catch((err1) => {
			console.log(err1)
		})

	})
	.catch((err) => {
		console.log(err)
	})

})


// will be used for creating like
// USED
router.post('/create-like-for-socialpost', passport.authenticate('jwt', { session: false }), isAllowedInteractingWithOthersPosts, function(req, res, next){

	var socialpost_endpoint = req.body.socialpost_endpoint

	var newLike = new Like({
		_id: new mongoose.Types.ObjectId(),
	})

	User.findOne({ phone_number: req.user.user_object.phone_number })
	.then((user) => {
					
		newLike.user = user

	// finding BlogPost object
		SocialPost.findOne({endpoint: socialpost_endpoint})
		.then((socialpost) => {

			socialpost.likes.push( newLike )

			newLike.socialpost = socialpost

			newLike.save(function (err, newLike) {
				if (err) return console.log(err);
			})
				
			socialpost.save((err, socialpost) => res.status(200).json(socialpost) )


			let newActivity = new Activity({
				_id: new mongoose.Types.ObjectId(),
				user: user,
				activity_type: 'liked_post',
				post_liked: newLike,
			})
			newActivity.save()
			user.activities.push(newActivity)
			user.save()

		})
		.catch((err1) => {
			console.log(err1)
		})

	})
	.catch((err) => {
		console.log(err)
	})

})



// will be used for creating share
// USED
router.post('/create-share-for-socialpost', passport.authenticate('jwt', { session: false }), isAllowedInteractingWithOthersPosts, function(req, res, next){

	var socialpost_endpoint = req.body.socialpost_endpoint

	var newShare = new Share({
		_id: new mongoose.Types.ObjectId(),
	})

	User.findOne({ phone_number: req.user.user_object.phone_number })
	.then((user) => {
					
		newShare.user = user

	// finding BlogPost object
		SocialPost.findOne({endpoint: socialpost_endpoint})
		.then((socialpost) => {

			socialpost.shares.push( newShare )

			newShare.socialpost = socialpost

			newShare.save(function (err, newShare) {
				if (err) return console.log(err);
			})
				
			socialpost.save((err, socialpost) => res.status(200).json(socialpost) )


			let newActivity = new Activity({
				_id: new mongoose.Types.ObjectId(),
				user: user,
				activity_type: 'shared_post',
				post_share: newShare,
			})
			newActivity.save()
			user.activities.push(newActivity)
			user.save()

		})
		.catch((err1) => {
			console.log(err1)
		})

	})
	.catch((err) => {
		console.log(err)
	})

})


// get n childs of blogpost
// USED 
router.get('/get-all-comments-of-socialpost', async function(req, res, next){

	let list_of_promises = []

	var socialpost_with_comments = await SocialPost.findOne({endpoint:req.query.endpoint}).
	populate('comments').
	then((socialpost) => {

		if ( socialpost ){

			return socialpost.comments

		} else {

			null
		}
	})
	.catch((err) => console.log(err))

	// console.log(socialpost_with_comments)

	list_of_promises.push( socialpost_with_comments )

	var users_list_who_commented = await Promise.all(socialpost_with_comments.map(async (comment_object) => {
	// find user from each like
		return await User.findOne({_id:comment_object.user})
		.then(async (user_object) => {

			if (user_object){
				// console.log('USER FOUND')
				// console.log(user_object)
				return {
					// ...user_object, // NEVER SPREAD IN MONGOOSE, IT INCLUDES _doc and lots of other info
					user_name:user_object.user_name,
					user_avatar_image: base64_encode(user_object.user_avatar_image),
					comment_text:comment_object.comment_text
				}

			} else {
				null
			}
		})

	}))

	// console.log('PROMISE RESULT 1')
	// console.log(users_list_who_commented)

// find image from user
// NOT NEEDED SINCE IMAGE IS NOT SEPARATE TABLE BUT RATHER IN SOCIALPOST
	// var final_comments_payload = await Promise.all(users_list_who_commented.map(async (user_object) => {
	
	// 	return await Image.findOne({_id:user_object.user_image})
	// 	.then(async (image_object) => {

	// 		if (image_object){

	// 			return {
	// 				user_name:user_object.user_name,
	// 				user_image:base64_encode(image_object.image_filepath),
	// 				comment_text:user_object.text,
	// 			}

	// 		} else {
	// 			null
	// 		}

	// 	})

	// }))

	// console.log('PROMISE RESULT 2')
	// console.log(final_comments_payload)

	let final_comments_payload = users_list_who_commented

	Promise.all(list_of_promises)
	.then(() => {
		// console.log('COMMENTS SENT BELOW')
		// console.log(final_comments_payload)
		res.status(200).json( final_comments_payload );

	})

})


// USED
router.get('/get-all-likes-of-socialpost',async function(req, res, next){

	let list_of_promises = []

// find blogpost
	var socialpost_with_likes = await SocialPost.findOne({endpoint:req.query.endpoint}).
	populate('likes').
	then((socialpost_with_likes) => {

		if ( socialpost_with_likes ){

			return socialpost_with_likes.likes
	
		} else {

			null

		}

	})

	list_of_promises.push( socialpost_with_likes )

// find likes from blogpost
	let final_liked_payload = await Promise.all(socialpost_with_likes.map(async (like_object) => {

	// find user from each like
		return await User.findOne({_id:like_object.user})
		.then(async (user_object) => {

			if (user_object){

				// return user_object
				return {
					user_name:user_object.user_name,
					user_avatar_image:base64_encode(user_object.user_avatar_image),
				}

			} else {
				null
			}
		})
		
	}))

	// console.log('PROMISE RESULT 1')
	// console.log(users_list_who_liked)

// find image from user
// NOT NEEDED SINCE WE DID NOT MAKE IMAGE AS SEPARATE ENTITY
	// let final_liked_payload = await Promise.all(users_list_who_liked.map(async (user_object) => {
	
	// 	return await Image.findOne({_id:user_object.user_image})
	// 	.then(async (image_object) => {

	// 		if (image_object){

	// 			return {
	// 				user_name:user_object.user_name,
	// 				user_image:base64_encode(image_object.image_filepath),
	// 			}

	// 		} else {
	// 			null
	// 		}

	// 	})

	// }))

	// console.log('PROMISE RESULT 2')
	// console.log(final_liked_payload)

	Promise.all(list_of_promises)
	.then(() => {

		// console.log(final_liked_payload)
		res.status(200).json( final_liked_payload );

	})

})


router.get('/get-all-shares-of-socialpost',async function(req, res, next){

	let list_of_promises = []

// find blogpost
	var socialpost_with_shares = await SocialPost.findOne({endpoint:req.query.endpoint}).
	populate('shares').
	then((socialpost_with_shares) => {

		if ( socialpost_with_shares ){

			return socialpost_with_shares.shares
	
		} else {

			null

		}

	})

	list_of_promises.push( socialpost_with_shares )

// find likes from blogpost
	let final_shares_payload = await Promise.all(socialpost_with_shares.map(async (share_object) => {

	// find user from each like
		return await User.findOne({_id:share_object.user})
		.then(async (user_object) => {

			if (user_object){

				// return user_object
				return {
					user_name:user_object.user_name,
					user_avatar_image:base64_encode(user_object.user_avatar_image),
				}

			} else {
				null
			}
		})
		
	}))

	// console.log('PROMISE RESULT 1')
	// console.log(users_list_who_liked)

// find image from user
// NOT NEEDED SINCE WE DID NOT MAKE IMAGE AS SEPARATE ENTITY
	// let final_shares_payload = await Promise.all(users_list_who_liked.map(async (user_object) => {
	
	// 	return await Image.findOne({_id:user_object.user_image})
	// 	.then(async (image_object) => {

	// 		if (image_object){

	// 			return {
	// 				user_name:user_object.user_name,
	// 				user_image:base64_encode(image_object.image_filepath),
	// 			}

	// 		} else {
	// 			null
	// 		}

	// 	})

	// }))

	// console.log('PROMISE RESULT 2')
	// console.log(final_shares_payload)

	Promise.all(list_of_promises)
	.then(() => {

		// console.log(final_shares_payload)
		res.status(200).json( final_shares_payload );

	})

})




















// create a new socialpost with children

router.post('/create-socialpost-with-children', function(req, res, next){
	const newSocialPost = new SocialPost({

		_id: new mongoose.Types.ObjectId(),
		type_of_post: req.body.parent.type_of_post,
		post_text: req.body.parent.post_text,
		image_for_post: req.body.parent.image_for_post,
		video_for_post: req.body.parent.video_for_post,
		video_thumbnail_image: req.body.parent.video_thumbnail_image,
		total_likes: req.body.parent.total_likes,
		total_shares: req.body.parent.total_shares,
		endpoint: req.body.parent.endpoint,
		date_of_publishing: req.body.parent.date_of_publishing,

	});

	newSocialPost.save(function (err, newSocialPost) {
		if (err) return console.log(err);

		const newComment = new Comment({

			_id: new mongoose.Types.ObjectId(),
			comment_text: req.body.children.comment_text,
			date_of_publishing: req.body.children.date_of_publishing,

		//assigning parent
			socialpost:newSocialPost._id,
			user:newSocialPost._id,

		});

		newSocialPost.comments.push(newComment._id)
		const newLike = new Like({

			_id: new mongoose.Types.ObjectId(),

		//assigning parent
			socialpost:newSocialPost._id,
			user:newSocialPost._id,

		});

		newSocialPost.likes.push(newLike._id)
		const newShare = new Share({

			_id: new mongoose.Types.ObjectId(),

		//assigning parent
			socialpost:newSocialPost._id,
			user:newSocialPost._id,

		});

		newSocialPost.shares.push(newShare._id)
		const newUser = new User({

			_id: new mongoose.Types.ObjectId(),
			phone_number: req.body.children.phone_number,
			user_name: req.body.children.user_name,
			user_name_in_profile: req.body.children.user_name_in_profile,
			user_avatar_image: req.body.children.user_avatar_image,
			user_cover_image: req.body.children.user_cover_image,
			user_brief_intro: req.body.children.user_brief_intro,
			user_about_me: req.body.children.user_about_me,
			user_working_zone: req.body.children.user_working_zone,
			user_education: req.body.children.user_education,
			user_contact_details: req.body.children.user_contact_details,

		//assigning parent
			socialposts:newSocialPost._id,
			comments:newSocialPost._id,
			likes:newSocialPost._id,
			shares:newSocialPost._id,

		});

		newSocialPost.users.push(newUser._id)

	newSocialPost.save();

	});

});

// find socialpost
	
router.get('/find-socialpost', function(req, res, next){

	SocialPost.findOne({ endpoint: req.body.endpoint })
	.then((socialpost) => {

		socialpost[ image_for_post ] = base64_encode( socialpost[ 'image_for_post' ] )
		socialpost[ video_thumbnail_image ] = base64_encode( socialpost[ 'video_thumbnail_image' ] )

		if (!socialpost) {

			res.status(401).json({ success: false, msg: "could not find socialpost" });

		} else {

			res.status(200).json(socialpost);

		}

	})
	.catch((err) => {

		next(err);

	});

});

// find comment
	
router.get('/find-comment', function(req, res, next){

	Comment.findOne({ comment_order: req.body.comment_order })
	.then((comment) => {
		if (!comment) {

			res.status(401).json({ success: false, msg: "could not find comment" });

		} else {

			res.status(200).json(comment);

		}

	})
	.catch((err) => {

		next(err);

	});

});

// find like
	
router.get('/find-like', function(req, res, next){

	Like.findOne({ comment_order: req.body.comment_order })
	.then((like) => {
		if (!like) {

			res.status(401).json({ success: false, msg: "could not find like" });

		} else {

			res.status(200).json(like);

		}

	})
	.catch((err) => {

		next(err);

	});

});

// find share
	
router.get('/find-share', function(req, res, next){

	Share.findOne({ comment_order: req.body.comment_order })
	.then((share) => {
		if (!share) {

			res.status(401).json({ success: false, msg: "could not find share" });

		} else {

			res.status(200).json(share);

		}

	})
	.catch((err) => {

		next(err);

	});

});

// find user
	
router.get('/find-user', function(req, res, next){

	User.findOne({ phone_number: req.body.phone_number })
	.then((user) => {

		user[ user_avatar_image ] = base64_encode( user[ 'user_avatar_image' ] )
		user[ user_cover_image ] = base64_encode( user[ 'user_cover_image' ] )

		if (!user) {

			res.status(401).json({ success: false, msg: "could not find user" });

		} else {

			res.status(200).json(user);

		}

	})
	.catch((err) => {

		next(err);

	});

});

// get n childs of socialpost

router.get('/top-n-share-of-socialpost', function(req, res, next){
	SocialPost.
	findOne({endpoint:req.body.endpoint}).
	populate('shares').
	exec(function (err, socialpost_with_shares) {

		if (err) return console.log(err);

		var shares = socialpost_with_shares.shares
		new_share_collection = []				
			for (let i = 0; i < shares.length; i++) {
				if ( i === req.body.child_count ){
					break
				}

				new_share_collection.push( shares[i] )
			} 


		res.status(200).json(new_share_collection);

	});
})

// get n childs of socialpost

router.get('/get-all-shares-of-socialpost', function(req, res, next){
	SocialPost.findOne({endpoint:req.query.endpoint}).
	populate('shares').
	exec(function (err, socialpost_with_shares) {

		if (err) return console.log(err);

		if ( socialpost_with_shares ){

			var shares = socialpost_with_shares.shares
			res.status(200).json( shares );

		} else {

			res.status(500).json({msg: 'sorry no socialpost found'});				

		}
	})
})


// create socialpost with undefined

router.post('/create-socialpost-with-user', function(req, res, next){
	
	var socialpost_object = req.body.socialpost_object
	var user_object = req.body.user_object

	var newSocialPost = new SocialPost({
		_id: new mongoose.Types.ObjectId(),
		...socialpost_object
	})

	newSocialPost.save(function (err, newSocialPost) {
		if (err) return console.log(err);

			User.
			findOne({...user_object})
		.then((user) => {
			
			if( !user ){
			
				console.log('no User found')
			
			} else {
			
				newSocialPost.user = user
				res.status(200).json( newSocialPost )
			
			}
		})
		.catch((err) => {
			console.log(err)
		})
	})
})



// create Share for socialpost

router.post('/create-share-for-socialpost', function(req, res, next){

	var share_object = req.body.share_object	
	var socialpost_object = req.body.socialpost_object
	var user_object = req.body.user_object

	var newShare = new Share({
		_id: new mongoose.Types.ObjectId(),
		...share_object
	})

	newShare.save(function (err, newShare) {
		if (err) return console.log(err);

			User.findOne({...user_object})
		.then((user) => {
			
			if( !user ){
			
				console.log('no User found')
			
			} else {
			
				newShare.user = user

			// finding SocialPost object
					SocialPost.findOne({endpoint: socialpost_object.endpoint})
				.then((socialpost) => {

					if ( !socialpost ){

						console.log('no SocialPost found')

					} else {

						socialpost.shares.push( newShare )
						socialpost.save((err, blogpost) => res.status(200).json(socialpost) )
						
					}
				})
				.catch((err1) => {
					console.log(err1)
				})

			}
		})
		.catch((err) => {
			console.log(err)
		})
	})
})



// get socialposts_list

router.get('/socialposts-list', function(req, res, next){

	SocialPost.
	find().
	limit(10).
	then((socialposts)=>{
		var newSocialPosts_list = []
		socialposts.map((socialpost, index)=>{
			var newSocialPost = {}

			newSocialPost.type_of_post = socialpost[ 'type_of_post' ]
			newSocialPost.post_text = socialpost[ 'post_text' ]
			newSocialPost.image_for_post = base64_encode( socialpost[ 'image_for_post' ] )
			newSocialPost.video_for_post = socialpost[ 'video_for_post' ]
			newSocialPost.video_thumbnail_image = base64_encode( socialpost[ 'video_thumbnail_image' ] )
			newSocialPost.total_likes = socialpost[ 'total_likes' ]
			newSocialPost.total_shares = socialpost[ 'total_shares' ]
			newSocialPost.endpoint = socialpost[ 'endpoint' ]
			newSocialPost.date_of_publishing = socialpost[ 'date_of_publishing' ]

			newSocialPosts_list.push({...newSocialPost})
			newSocialPost = {}
		});

		return newSocialPosts_list
	})
	.then((newSocialPosts_list) => {

		if (!newSocialPosts_list) {

			res.status(401).json({ success: false, msg: "could not find SocialPosts_list" });

		} else {

			res.status(200).json(newSocialPosts_list);

		}

	})
	.catch((err) => {

		next(err);

	});
});


// get socialposts_list_next_10_with_children

router.get('/socialposts-list-next-10-with-children', function(req, res, next){

	SocialPost.
	find().
	skip(10).
	limit(10).
	populate('comments').
	populate('likes').
	populate('shares').
	populate('user').
	then((socialposts)=>{
		var newSocialPosts_list = []
		socialposts.map((socialpost, index)=>{
			var newSocialPost = {}

			newSocialPost.type_of_post = socialpost[ 'type_of_post' ]
			newSocialPost.post_text = socialpost[ 'post_text' ]
			newSocialPost.image_for_post = base64_encode( socialpost[ 'image_for_post' ] )
			newSocialPost.video_for_post = socialpost[ 'video_for_post' ]
			newSocialPost.video_thumbnail_image = base64_encode( socialpost[ 'video_thumbnail_image' ] )
			newSocialPost.total_likes = socialpost[ 'total_likes' ]
			newSocialPost.total_shares = socialpost[ 'total_shares' ]
			newSocialPost.endpoint = socialpost[ 'endpoint' ]
			newSocialPost.date_of_publishing = socialpost[ 'date_of_publishing' ]

			newSocialPosts_list.push({...newSocialPost})
			newSocialPost = {}
		});

		return newSocialPosts_list
	})
	.then((newSocialPosts_list) => {

		if (!newSocialPosts_list) {

			res.status(401).json({ success: false, msg: "could not find SocialPosts_list" });

		} else {

			res.status(200).json(newSocialPosts_list);

		}

	})
	.catch((err) => {

		next(err);

	});

});

// get socialpost with children

router.get('/socialpost-with-children', function(req, res, next){

	SocialPost.
	findOne({endpoint:req.body.endpoint}).

	populate('comments').
	populate('likes').
	populate('shares').
	populate('user').

	exec(function (err, socialpost_with_children) {
		if (err) return console.log(err);

		res.status(200).json(socialpost_with_children);
	});

})


// get socialpost with summarized children

router.get('/socialpost-with-summarized-children', function(req, res, next){
	SocialPost.
	findOne({endpoint:req.body.endpoint}).
	populate('comments').
	populate('likes').
	populate('shares').
	populate('user').
	exec(function (err, blogpost_with_children) {

		if (err) return console.log(err);


		var current_comments = socialpost_with_children.comments
		new_comments = []

		var current_likes = socialpost_with_children.likes
		new_likes = []

		var current_shares = socialpost_with_children.shares
		new_shares = []

		var current_user = socialpost_with_children.user
		new_user = []

		current_comments.map((comment, index)=>{
			var newComment = {}


			newComment.comment_text = comment[ 'comment_text' ]
			newComment.date_of_publishing = comment[ 'date_of_publishing' ]

			new_comments.push({...newComment})
			newComment = {}
		});

		socialpost_with_children.comments = new_comments

		current_likes.map((like, index)=>{
			var newLike = {}



			new_likes.push({...newLike})
			newLike = {}
		});

		socialpost_with_children.likes = new_likes

		current_shares.map((share, index)=>{
			var newShare = {}



			new_shares.push({...newShare})
			newShare = {}
		});

		socialpost_with_children.shares = new_shares

		current_users.map((user, index)=>{
			var newUser = {}


			newUser.phone_number = user[ 'phone_number' ]
			newUser.user_name = user[ 'user_name' ]

			new_users.push({...newUser})
			newUser = {}
		});

		socialpost_with_children.users = new_users

		res.status(200).json(socialpost_with_children);

	});
})

// get next 10 socialposts_list

router.get('/socialposts-next-10-list', function(req, res, next){

	SocialPost.
	find().
	limit(10).
	skip(10).
	then( 
		(socialposts) => {
			var newSocialPosts_list = []
			socialposts.map((socialpost, index) => {
				var newSocialPost = {}

				newSocialPost.type_of_post = socialpost[ 'type_of_post' ]
				newSocialPost.post_text = socialpost[ 'post_text' ]
				newSocialPost.image_for_post = base64_encode( socialpost[ 'image_for_post' ] )
				newSocialPost.video_for_post = socialpost[ 'video_for_post' ]
				newSocialPost.video_thumbnail_image = base64_encode( socialpost[ 'video_thumbnail_image' ] )
				newSocialPost.total_likes = socialpost[ 'total_likes' ]
				newSocialPost.total_shares = socialpost[ 'total_shares' ]
				newSocialPost.endpoint = socialpost[ 'endpoint' ]
				newSocialPost.date_of_publishing = socialpost[ 'date_of_publishing' ]

				newSocialPosts_list.push({...newSocialPost})
				newSocialPost = {}
			})
		})

		return newSocialPosts_list
	.then((newSocialPosts_list) => {

		if (!newSocialPosts_list) {

			res.status(401).json({ success: false, msg: "could not find SocialPosts_list" });

		} else {

			res.status(200).json(newSocialPosts_list);

		}

	})
	.catch((err) => {

		next(err);

	});

});
// create a comment for some socialpost
router.post('/remove-comment-from-socialpost', function(req, res, next){

	SocialPost.findOne({ endpoint: req.body.endpoint })
	.then((socialpost) => {

		socialpost.save(function (err, socialpost) {
			if (err) return console.log(err);

				Comment.findOne({ comment_order: req.body.child_index })


				.then((comment)=>{

				let index_of_comment = socialpost.comments.indexOf(comment);

				if (index_of_comment !== -1){

					socialpost.comments.splice(index, 1);

				}
			})

			Comment.findOneAndRemove( { comment_order: req.body.child_index }, (err) => {
				if (err) { console.log(err) }
			})

		});

		socialpost.save();

	});

});

// create a like for some socialpost
router.post('/remove-like-from-socialpost', function(req, res, next){

	SocialPost.findOne({ endpoint: req.body.endpoint })
	.then((socialpost) => {

		socialpost.save(function (err, socialpost) {
			if (err) return console.log(err);

				Like.findOne({ comment_order: req.body.child_index })


				.then((like)=>{

				let index_of_like = socialpost.likes.indexOf(like);

				if (index_of_like !== -1){

					socialpost.likes.splice(index, 1);

				}
			})

			Like.findOneAndRemove( { comment_order: req.body.child_index }, (err) => {
				if (err) { console.log(err) }
			})

		});

		socialpost.save();

	});

});

// create a share for some socialpost
router.post('/remove-share-from-socialpost', function(req, res, next){

	SocialPost.findOne({ endpoint: req.body.endpoint })
	.then((socialpost) => {

		socialpost.save(function (err, socialpost) {
			if (err) return console.log(err);

				Share.findOne({ comment_order: req.body.child_index })


				.then((share)=>{

				let index_of_share = socialpost.shares.indexOf(share);

				if (index_of_share !== -1){

					socialpost.shares.splice(index, 1);

				}
			})

			Share.findOneAndRemove( { comment_order: req.body.child_index }, (err) => {
				if (err) { console.log(err) }
			})

		});

		socialpost.save();

	});

});


// create User



module.exports = router;