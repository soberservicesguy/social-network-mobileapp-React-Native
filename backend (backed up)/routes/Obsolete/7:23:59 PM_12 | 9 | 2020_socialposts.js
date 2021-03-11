require('../models/socialpost');
require('../models/comment');
require('../models/like');
require('../models/share');
require('../models/user');


const base64_encode = require('../lib/image_to_base64')
const mongoose = require('mongoose');
const router = require('express').Router();
const SocialPost = mongoose.model('SocialPost');
const Comment = mongoose.model('Comment');
const Like = mongoose.model('Like');
const Share = mongoose.model('Share');
const User = mongoose.model('User');

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

// get socialposts_list_with_children

router.get('/socialposts-list-with-children', function(req, res, next){

	SocialPost.
		find().
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

router.post('/create-user', function(req, res, next){

	User.findOne({
		phone_number: req.body.phone_number,
		user_name: req.body.user_name,
		user_name_in_profile: req.body.user_name_in_profile,
		user_avatar_image: req.body.user_avatar_image,
		user_cover_image: req.body.user_cover_image,
		user_brief_intro: req.body.user_brief_intro,
		user_about_me: req.body.user_about_me,
		user_working_zone: req.body.user_working_zone,
		user_education: req.body.user_education,
		user_contact_details: req.body.user_contact_details,
	})
	.then((user) => {

		if (!user) {


			const newUser = new User({
				_id: new mongoose.Types.ObjectId(),
				phone_number: req.body.phone_number,
				user_name: req.body.user_name,
				user_name_in_profile: req.body.user_name_in_profile,
				user_avatar_image: req.body.user_avatar_image,
				user_cover_image: req.body.user_cover_image,
				user_brief_intro: req.body.user_brief_intro,
				user_about_me: req.body.user_about_me,
				user_working_zone: req.body.user_working_zone,
				user_education: req.body.user_education,
				user_contact_details: req.body.user_contact_details,
			});

			newUser.save(function (err, newUser) {

				if (err) return console.log(err);

				res.status(200).json({success: true})
				
			})

		} else {

			res.status(401).json({ success: false, msg: "user already registered, try another or login" })

		}

	})
	.catch((err) => {

		console.log(err)
		// next(err)

	});
})


module.exports = router;