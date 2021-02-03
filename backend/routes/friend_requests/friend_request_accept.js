require('../../models/book');
require('../../models/user');

const passport = require('passport');
const { isAllowedSurfing } = require('../authMiddleware/isAllowedSurfing')


const base64_encode = require('../../lib/image_to_base64')
const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');

const multer = require('multer');
const path = require('path')

require('../../models/activity');
const Activity = mongoose.model('Activity');

router.post('/send-friend-request', passport.authenticate('jwt', { session: false }), async function(req, res, next){

	try{

		let user_sending_request = await User.findOne({ phone_number: req.user.user_object.phone_number }) // using req.user from passport js middleware
		let user_to_send_request = await User.findOne({ endpoint: req.body.endpoint }) // using req.user from passport js middleware

		user_sending_request.friend_requests_sent.push(user_to_send_request)
		user_sending_request.save()

		res.status(200).json({msg: 'Friend request sent'})

		let newActivity = new Activity({
			_id: new mongoose.Types.ObjectId(),
			user: user_sending_request,
			activity_type: 'sent_friend_request',
			sent_friend_request: user_to_send_request,
		})

		newActivity.save()
		user_sending_request.activities.push(newActivity)
		user_sending_request.save()

	} catch (err) {

		console.log(err)

	}

})


router.post('/accept-friend-request', passport.authenticate('jwt', { session: false }), async function(req, res, next){

	try{

		let user_accepting_request = await User.findOne({ phone_number: req.user.user_object.phone_number }).populate('friend_requests') // using req.user from passport js middleware
		
		let user_to_accept_as_friend = user_accepting_request.friend_requests.filter(
			function(user_who_sent_request){
				return user_who_sent_request.endpoint === req.body.endpoint
			}
		)

	// the friend who is accepting
		// add in friends
		user_accepting_request.friends.push(user_to_accept_as_friend) 
		// remove from friend_requests		
		let index1 = user_accepting_request.friend_requests.indexOf( user_to_accept_as_friend );
		if (index1 > -1) {
			user_accepting_request.friend_requests.splice(index, 1);
		}

	// the friend who sent
		// remove from friend requests sent
		user_to_accept_as_friend = await User.findOne({ endpoint: req.body.endpoint }).populate('friend_requests_sent')
		let index2 = user_to_accept_as_friend.friend_requests_sent.indexOf( user_accepting_request )
		if (index2 > -1) {
			user_to_accept_as_friend.friend_requests_sent.splice(index, 1);
		}
		// add in friends
		user_to_accept_as_friend.friends.push(user_accepting_request)

		user_accepting_request.save()
		user_to_accept_as_friend.save()

		res.status(200).json({msg: 'Friend request accepted'})

		let newActivity = new Activity({
			_id: new mongoose.Types.ObjectId(),
			user: user_sending_request,
			activity_type: 'accepted_friend_request',
			accepted_friend_request: user_to_accept_as_friend,
		})

		newActivity.save()
		user_accepting_request.activities.push(newActivity)
		user_accepting_request.save()

	} catch (err) {

		console.log(err)

	}

})



router.get('/friend-activity-notifications', passport.authenticate('jwt', { session: false }), async function(req, res, next){

	try{

		let user_checking_notifications = await User.findOne({ phone_number: req.user.user_object.phone_number }).populate('friends') // using req.user from passport js middleware
		let { friends, last_timestamp_of_checking_notification } =  user_checking_notifications

		let friends_activities = []
		let all_activities = null

		let all_friends = await Promise.all(friends.map(async (friend) => {

			all_activities = await Promise.all(friend.activities.map(async (activity) => {

				if ( last_timestamp_of_checking_notification !== null && activity.timestamp > last_timestamp_of_checking_notification ){
					
					let { activity_type, timestamp, endpoint} = activity
					friends_activities.push({
						activity_type,
						timestamp,
						endpoint,
					})
				}
			}))

		}))

		res.status(200).json(friends_activities)

	} catch (err){

		console.log(err)

	}
})

module.exports = router;