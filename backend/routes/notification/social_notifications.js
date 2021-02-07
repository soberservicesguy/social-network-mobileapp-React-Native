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
router.get('/get-notifications', passport.authenticate('jwt', { session: false }), async function(req, res, next){

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

						case "accepted_friend_request":
							var { accepted_friend_request } = activity
							new_friend = await User.findOne({_id: accepted_friend_request})
							let new_friends_details = { 
								new_friends_user_name: new_friend.user_name_in_profile,
								new_friends_avatar: new_friend.user_avatar_image,
								new_friend_endpoint :new_friend.endpoint,
							}
							post_details = { ...post_details, ...new_friends_details, activity_type, user_name_in_profile, user_avatar_image, new_friend_endpoint }
							activities_to_send.push(post_details)

						case "created_post":

							var { post_created } = activity
							post_created = await SocialPost.findOne({_id: post_created})
							var { type_of_post, total_likes, total_shares, total_comments, endpoint } = post_created
							post_details = { ...post_details, activity_type, type_of_post, total_likes, total_shares, total_comments, endpoint }

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
							var { book_name, book_image, book_description, interested_users, endpoint } = book_liked
							post_details = { ...post_details, activity_type, book_name, book_image, book_description, endpoint }
							activities_to_send.push(post_details)
							break

						case "created_page":

							let { page_created } = activity
							page_created = await Page.findOne({_id: page_created})
							var { page_name, page_image, page_description, interested_users, endpoint } = page_created
							post_details = { ...post_details, activity_type, page_name, page_image, page_description, endpoint }
							activities_to_send.push(post_details)
							break

						case "got_interested_in_page":

							let { page_liked } = activity
							page_liked = await Page.findOne({_id: page_liked})
							var { page_name, page_image, page_description, interested_users, endpoint } = page_liked
							post_details = { ...post_details, activity_type, page_name, page_image, page_description, endpoint }
							activities_to_send.push(post_details)
							break

						case "created_sport":

							let { sport_created } = activity
							sport_created = await Sport.findOne({_id: sport_created})
							var { sport_name, sport_image, sport_description, interested_users, endpoint } = sport_created
							post_details = { ...post_details, activity_type, sport_name, sport_image, sport_description, endpoint }
							activities_to_send.push(post_details)
							break

						case "got_interested_in_sport":

							let { sport_liked } = activity
							sport_liked = await Sport.findOne({_id: sport_liked})
							var { sport_name, sport_image, sport_description, interested_users, endpoint } = sport_created
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
