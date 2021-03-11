require('../models/advertisement');


const base64_encode = require('../lib/image_to_base64')
const mongoose = require('mongoose');
const router = require('express').Router();
const Advertisement = mongoose.model('Advertisement');

// create a new advertisement with children

router.post('/create-advertisement-with-children', function(req, res, next){
	const newAdvertisement = new Advertisement({

		_id: new mongoose.Types.ObjectId(),
		ad_name: req.body.parent.ad_name,
		ad_image: req.body.parent.ad_image,
		ad_description: req.body.parent.ad_description,
		endpoint: req.body.parent.endpoint,

	});

	newAdvertisement.save(function (err, newAdvertisement) {
		if (err) return console.log(err);




	newAdvertisement.save();

	});

});

// find advertisement
	
router.get('/find-advertisement', function(req, res, next){

	Advertisement.findOne({ endpoint: req.body.endpoint })
		.then((advertisement) => {

			advertisement[ ad_image ] = base64_encode( advertisement[ 'ad_image' ] )

			if (!advertisement) {

				res.status(401).json({ success: false, msg: "could not find advertisement" });

			} else {

				res.status(200).json(advertisement);

			}

		})
		.catch((err) => {

			next(err);

		});
});

// get advertisements_list

router.get('/advertisements-list', function(req, res, next){

Advertisement.
	find().
	limit(10).
	then((advertisements)=>{
		var newAdvertisements_list = []
		advertisements.map((advertisement, index)=>{
			var newAdvertisement = {}

			newAdvertisement.ad_name = advertisement[ 'ad_name' ]
			newAdvertisement.ad_image = base64_encode( advertisement[ 'ad_image' ] )
			newAdvertisement.ad_description = advertisement[ 'ad_description' ]
			newAdvertisement.endpoint = advertisement[ 'endpoint' ]

			newAdvertisements_list.push({...newAdvertisement})
			newAdvertisement = {}
		});

		return newAdvertisements_list
	})

	.then((newAdvertisements_list) => {

		if (!newAdvertisements_list) {

			res.status(401).json({ success: false, msg: "could not find Advertisements_list" });

		} else {

			res.status(200).json(newAdvertisements_list);

		}

	})
	.catch((err) => {

		next(err);

	});
});

// get advertisements_list_with_children

router.get('/advertisements-list-with-children', function(req, res, next){

	Advertisement.
		find().
		limit(10).
		populate('comments').
		populate('likes').
		populate('shares').
		populate('user').
		then((advertisements)=>{
			var newAdvertisements_list = []
			advertisements.map((advertisement, index)=>{
				var newAdvertisement = {}

				newAdvertisement.ad_name = advertisement[ 'ad_name' ]
				newAdvertisement.ad_image = base64_encode( advertisement[ 'ad_image' ] )
				newAdvertisement.ad_description = advertisement[ 'ad_description' ]
				newAdvertisement.endpoint = advertisement[ 'endpoint' ]

				newAdvertisements_list.push({...newAdvertisement})
				newAdvertisement = {}
			});

			return newAdvertisements_list
		})

		.then((newAdvertisements_list) => {

			if (!newAdvertisements_list) {

				res.status(401).json({ success: false, msg: "could not find Advertisements_list" });

			} else {

				res.status(200).json(newAdvertisements_list);

			}

		})
		.catch((err) => {

			next(err);

		});
});

// get advertisements_list_next_10_with_children

router.get('/advertisements-list-next-10-with-children', function(req, res, next){

	Advertisement.
		find().
		skip(10).
		limit(10).
		populate('comments').
		populate('likes').
		populate('shares').
		populate('user').
		then((advertisements)=>{
			var newAdvertisements_list = []
			advertisements.map((advertisement, index)=>{
				var newAdvertisement = {}

				newAdvertisement.ad_name = advertisement[ 'ad_name' ]
				newAdvertisement.ad_image = base64_encode( advertisement[ 'ad_image' ] )
				newAdvertisement.ad_description = advertisement[ 'ad_description' ]
				newAdvertisement.endpoint = advertisement[ 'endpoint' ]

				newAdvertisements_list.push({...newAdvertisement})
				newAdvertisement = {}
			});

			return newAdvertisements_list
		})

		.then((newAdvertisements_list) => {

			if (!newAdvertisements_list) {

				res.status(401).json({ success: false, msg: "could not find Advertisements_list" });

			} else {

				res.status(200).json(newAdvertisements_list);

			}

		})
		.catch((err) => {

			next(err);

		});
});

// get advertisement with children

router.get('/advertisement-with-children', function(req, res, next){
	Advertisement.
		findOne({endpoint:req.body.endpoint}).


		exec(function (err, advertisement_with_children) {
			if (err) return console.log(err);

			res.status(200).json(advertisement_with_children);
		});
})


// get advertisement with summarized children

router.get('/advertisement-with-summarized-children', function(req, res, next){
	Advertisement.
		findOne({endpoint:req.body.endpoint}).


		exec(function (err, blogpost_with_children) {

			if (err) return console.log(err);


		res.status(200).json(advertisement_with_children);

	});
})

// get next 10 advertisements_list

router.get('/advertisements-next-10-list', function(req, res, next){

	Advertisement.
		find().
		limit(10).
		skip(10).
		then( 
			(advertisements) => {
				var newAdvertisements_list = []
				advertisements.map((advertisement, index) => {
					var newAdvertisement = {}
	
					newAdvertisement.ad_name = advertisement[ 'ad_name' ]
					newAdvertisement.ad_image = base64_encode( advertisement[ 'ad_image' ] )
					newAdvertisement.ad_description = advertisement[ 'ad_description' ]
					newAdvertisement.endpoint = advertisement[ 'endpoint' ]

					newAdvertisements_list.push({...newAdvertisement})
					newAdvertisement = {}
					})
			})

			return newAdvertisements_list

		.then((newAdvertisements_list) => {

			if (!newAdvertisements_list) {

				res.status(401).json({ success: false, msg: "could not find Advertisements_list" });

			} else {

				res.status(200).json(newAdvertisements_list);

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