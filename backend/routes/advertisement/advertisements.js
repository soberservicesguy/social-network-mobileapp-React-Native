require('../../models/advertisement');
require('../../models/user');

const base64_encode = require('../../lib/image_to_base64')
const mongoose = require('mongoose');
const router = require('express').Router();
const Advertisement = mongoose.model('Advertisement');
const User = mongoose.model('User');

const passport = require('passport');
const { isAllowedSurfing } = require('../authMiddleware/isAllowedSurfing')
const { isAllowedCreatingAds } = require('../authMiddleware/isAllowedCreatingAds')

const multer = require('multer');
const path = require('path')

require('../../models/activity');
const Activity = mongoose.model('Activity');

// Set The Storage Engine
const image_storage = multer.diskStorage({
	destination: path.join(__dirname , '../../assets/images/uploads/advertisement_images'),
	filename: function(req, file, cb){
		// file name pattern fieldname-currentDate-fileformat
		// filename_used_to_store_image_in_assets_without_format = file.fieldname + '-' + Date.now()
		// filename_used_to_store_image_in_assets = filename_used_to_store_image_in_assets_without_format + path.extname(file.originalname)

		filename_used_to_store_image_in_assets = file.originalname
		cb(null, file.originalname);

	}
});

// Check File Type
function checkFileTypeForImage(file, cb){
	// Allowed ext
	let filetypes = /jpeg|jpg|png|gif/;
	// Check ext
	let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	let mimetype = filetypes.test(file.mimetype);

	if(mimetype && extname){
		return cb(null,true);
	} else {
		cb('Error: jpeg, jpg, png, gif Images Only!');
	}
}

// Init Upload
const upload_ad_image = multer({
	storage: image_storage,
	limits:{fileSize: 200000000}, // 1 mb
	fileFilter: function(req, file, cb){
		checkFileTypeForImage(file, cb);
	}
}).single('ad_image'); // this is the field that will be dealt
// .array('blogpost_image_main', 12)


// USED IN CREATING AD
router.post('/create-ad-with-user', passport.authenticate('jwt', { session: false }), isAllowedCreatingAds, function(req, res, next){
	
	// console.log('OUTER LOG')
	// console.log(req.body)

	upload_ad_image(req, res, (err) => {
		if(err){

			console.log(err)

		} else {

			if(req.file == undefined){

				res.status(404).json({ success: false, msg: 'File is undefined!',file: `uploads/${req.file.filename}`})

			} else {
				// console.log('INNER LOG')
				// console.log(req.body)

			// image is uploaded , now saving image in db
				const newAdvertisement = new Advertisement({

					_id: new mongoose.Types.ObjectId(),
					ad_name: req.body.parent.ad_name,
					ad_image: `./assets/images/uploads/advertisement_images/${filename_used_to_store_image_in_assets}`,
					ad_description: req.body.parent.ad_description,
					// endpoint: req.body.parent.endpoint,

				});

				newAdvertisement.save(function (err, newAdvertisement) {
					if (err){
						res.status(404).json({ success: false, msg: 'couldnt create ad database entry'})
						return console.log(err)
					}

					// assign user object then save
					User.findOne({ phone_number: req.user.user_object.phone_number }) // using req.user from passport js middleware
					.then((user) => {
						if (user){

							newAdvertisement.ad_uploaded_by_user = user
							newAdvertisement.save()

							// in response sending new image too with base64 encoding
							let base64_encoded_image = base64_encode(newAdvertisement.ad_image)

							let new_advertisement = {
								ad_name: newAdvertisement.ad_name,
								ad_image: base64_encoded_image,
								ad_description: new_advertisement.ad_description,
							}

							res.status(200).json({ success: true, msg: 'new ad saved', new_advertisement: new_advertisement});	


							let newActivity = new Activity({
								_id: new mongoose.Types.ObjectId(),
								user: user,
								activity_type: 'created_advertisement',
								ad_created: newAdvertisement,
							})
							newActivity.save()
							user.activities.push(newActivity)
							user.save()

						} else {

							res.status(200).json({ success: false, msg: "user doesnt exists, try logging in again" });

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




// get advertisements_list_with_children
// USED
router.get('/advertisements-list-with-children', function(req, res, next){

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




// create a new advertisement with children

router.post('/create-advertisement-with-children', function(req, res, next){
	const newAdvertisement = new Advertisement({

		_id: new mongoose.Types.ObjectId(),
		ad_name: req.body.parent.ad_name,
		ad_image: req.body.parent.ad_image,
		ad_description: req.body.parent.ad_description,
		// endpoint: req.body.parent.endpoint,

	});

	newAdvertisement.save(function (err, newAdvertisement) {
		if (err) return console.log(err);




	newAdvertisement.save();

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