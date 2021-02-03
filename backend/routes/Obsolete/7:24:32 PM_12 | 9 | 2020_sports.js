require('../models/sport');


const base64_encode = require('../lib/image_to_base64')
const mongoose = require('mongoose');
const router = require('express').Router();
const Sport = mongoose.model('Sport');

// create a new sport with children

router.post('/create-sport-with-children', function(req, res, next){
	const newSport = new Sport({

		_id: new mongoose.Types.ObjectId(),
		sport_name: req.body.parent.sport_name,
		sport_image: req.body.parent.sport_image,
		sport_description: req.body.parent.sport_description,
		endpoint: req.body.parent.endpoint,

	});

	newSport.save(function (err, newSport) {
		if (err) return console.log(err);




	newSport.save();

	});

});

// find sport
	
router.get('/find-sport', function(req, res, next){

	Sport.findOne({ endpoint: req.body.endpoint })
		.then((sport) => {

			sport[ sport_image ] = base64_encode( sport[ 'sport_image' ] )

			if (!sport) {

				res.status(401).json({ success: false, msg: "could not find sport" });

			} else {

				res.status(200).json(sport);

			}

		})
		.catch((err) => {

			next(err);

		});
});

// get sports_list

router.get('/sports-list', function(req, res, next){

Sport.
	find().
	limit(10).
	then((sports)=>{
		var newSports_list = []
		sports.map((sport, index)=>{
			var newSport = {}

			newSport.sport_name = sport[ 'sport_name' ]
			newSport.sport_image = base64_encode( sport[ 'sport_image' ] )
			newSport.sport_description = sport[ 'sport_description' ]
			newSport.endpoint = sport[ 'endpoint' ]

			newSports_list.push({...newSport})
			newSport = {}
		});

		return newSports_list
	})

	.then((newSports_list) => {

		if (!newSports_list) {

			res.status(401).json({ success: false, msg: "could not find Sports_list" });

		} else {

			res.status(200).json(newSports_list);

		}

	})
	.catch((err) => {

		next(err);

	});
});

// get sports_list_with_children

router.get('/sports-list-with-children', function(req, res, next){

	Sport.
		find().
		limit(10).
		populate('comments').
		populate('likes').
		populate('shares').
		populate('user').
		then((sports)=>{
			var newSports_list = []
			sports.map((sport, index)=>{
				var newSport = {}

				newSport.sport_name = sport[ 'sport_name' ]
				newSport.sport_image = base64_encode( sport[ 'sport_image' ] )
				newSport.sport_description = sport[ 'sport_description' ]
				newSport.endpoint = sport[ 'endpoint' ]

				newSports_list.push({...newSport})
				newSport = {}
			});

			return newSports_list
		})

		.then((newSports_list) => {

			if (!newSports_list) {

				res.status(401).json({ success: false, msg: "could not find Sports_list" });

			} else {

				res.status(200).json(newSports_list);

			}

		})
		.catch((err) => {

			next(err);

		});
});

// get sports_list_next_10_with_children

router.get('/sports-list-next-10-with-children', function(req, res, next){

	Sport.
		find().
		skip(10).
		limit(10).
		populate('comments').
		populate('likes').
		populate('shares').
		populate('user').
		then((sports)=>{
			var newSports_list = []
			sports.map((sport, index)=>{
				var newSport = {}

				newSport.sport_name = sport[ 'sport_name' ]
				newSport.sport_image = base64_encode( sport[ 'sport_image' ] )
				newSport.sport_description = sport[ 'sport_description' ]
				newSport.endpoint = sport[ 'endpoint' ]

				newSports_list.push({...newSport})
				newSport = {}
			});

			return newSports_list
		})

		.then((newSports_list) => {

			if (!newSports_list) {

				res.status(401).json({ success: false, msg: "could not find Sports_list" });

			} else {

				res.status(200).json(newSports_list);

			}

		})
		.catch((err) => {

			next(err);

		});
});

// get sport with children

router.get('/sport-with-children', function(req, res, next){
	Sport.
		findOne({endpoint:req.body.endpoint}).


		exec(function (err, sport_with_children) {
			if (err) return console.log(err);

			res.status(200).json(sport_with_children);
		});
})


// get sport with summarized children

router.get('/sport-with-summarized-children', function(req, res, next){
	Sport.
		findOne({endpoint:req.body.endpoint}).


		exec(function (err, blogpost_with_children) {

			if (err) return console.log(err);


		res.status(200).json(sport_with_children);

	});
})

// get next 10 sports_list

router.get('/sports-next-10-list', function(req, res, next){

	Sport.
		find().
		limit(10).
		skip(10).
		then( 
			(sports) => {
				var newSports_list = []
				sports.map((sport, index) => {
					var newSport = {}
	
					newSport.sport_name = sport[ 'sport_name' ]
					newSport.sport_image = base64_encode( sport[ 'sport_image' ] )
					newSport.sport_description = sport[ 'sport_description' ]
					newSport.endpoint = sport[ 'endpoint' ]

					newSports_list.push({...newSport})
					newSport = {}
					})
			})

			return newSports_list

		.then((newSports_list) => {

			if (!newSports_list) {

				res.status(401).json({ success: false, msg: "could not find Sports_list" });

			} else {

				res.status(200).json(newSports_list);

			}

		})
		.catch((err) => {

			next(err);

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