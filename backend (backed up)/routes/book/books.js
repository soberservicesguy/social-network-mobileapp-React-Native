require('../../models/book');
require('../../models/user');

const passport = require('passport');
const { isAllowedSurfing } = require('../authMiddleware/isAllowedSurfing')
const { isAllowedCreatingBooks } = require('../authMiddleware/isAllowedCreatingBooks')
const { isAllowedInteractingWithOthersPosts } = require('../authMiddleware/isAllowedInteractingWithOthersPosts')


const base64_encode = require('../../lib/image_to_base64')
const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');
const Book = mongoose.model('Book');

const multer = require('multer');
const path = require('path')

require('../../models/activity');
const Activity = mongoose.model('Activity');


// Set The Storage Engine
const image_storage = multer.diskStorage({
	destination: path.join(__dirname , '../../assets/images/uploads/books_images'),
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
const upload_book_image_by_user = multer({
	storage: image_storage,
	limits:{fileSize: 200000000}, // 1 mb
	fileFilter: function(req, file, cb){
		checkFileTypeForImage(file, cb);
	}
}).single('book_image'); // this is the field that will be dealt
// .array('blogpost_image_main', 12)




// create book with undefined
// USED IN CREATING BOOK
router.post('/create-book-with-user', passport.authenticate('jwt', { session: false }), isAllowedCreatingBooks, function(req, res, next){
	
	// console.log('OUTER LOG')
	// console.log(req.body)

	upload_book_image_by_user(req, res, (err) => {
		if(err){

			console.log(err)

		} else {

			if(req.file == undefined){

				res.status(404).json({ success: false, msg: 'File is undefined!',file: `uploads/${req.file.filename}`})

			} else {
				// console.log('INNER LOG')
				// console.log(req.body)

			// image is uploaded , now saving image in db
				const newBook = new Book({

					_id: new mongoose.Types.ObjectId(),
					book_name: req.body.parent.book_name,
					book_image: `./assets/images/uploads/books_images/${filename_used_to_store_image_in_assets}`,
					book_description: req.body.parent.book_description,
					// endpoint: req.body.parent.endpoint,

				});

				newBook.save(function (err, newBook) {

					if (err){
						res.status(404).json({ success: false, msg: 'couldnt create book database entry'})
						return console.log(err)
					}
					// assign user object then save
					User.findOne({ phone_number: req.user.user_object.phone_number }) // using req.user from passport js middleware
					.then((user) => {
						if (user){

							newBook.book_uploaded_by_user = user
							newBook.save()


							// in response sending new image too with base64 encoding
							let base64_encoded_image = base64_encode(newBook.book_image)

							let new_book = {
								book_name: newBook.book_name,
								book_image: base64_encoded_image,
								book_description: newBook.book_description,
							}

							res.status(200).json({ success: true, msg: 'new book saved', new_book: new_book});	


							let newActivity = new Activity({
								_id: new mongoose.Types.ObjectId(),
								user: user,
								activity_type: 'created_book',
								book_created: newBook,
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


// will be used for creating interest
// USED
router.post('/create-interest-for-book', passport.authenticate('jwt', { session: false }), isAllowedInteractingWithOthersPosts, function(req, res, next){

	var book_endpoint = req.body.book_endpoint

	// var newLike = new Like({
	// 	_id: new mongoose.Types.ObjectId(),
	// })

	User.findOne({ phone_number: req.user.user_object.phone_number })
	.then((user) => {
					
		// newLike.user = user

	// finding BlogPost object
		Book.findOne({endpoint: book_endpoint})
		.then((book) => {

			book.interested_users.push( user )

			// newLike.book = book

			// newLike.save(function (err, newLike) {
			// 	if (err) return console.log(err);
			// })
				
			book.save((err, book) => res.status(200).json(book) )


			let newActivity = new Activity({
				_id: new mongoose.Types.ObjectId(),
				user: user,
				activity_type: 'got_interested_in_book',
				book_liked: book,
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

// USED
router.get('/get-all-interest-in-book',async function(req, res, next){

	let list_of_promises = []

// find blogpost
	var book_with_interested_users = await Book.findOne({endpoint:req.query.endpoint}).
	populate('interested_users').
	then((book_with_interested_users) => {

		if ( book_with_interested_users ){

			return book_with_interested_users.interested_users
	
		} else {

			null

		}

	})

	list_of_promises.push( book_with_interested_users )

// find likes from blogpost
	let final_interested_payload = await Promise.all(book_with_interested_users.map(async (like_object) => {

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
	// let final_interested_payload = await Promise.all(users_list_who_liked.map(async (user_object) => {
	
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
	// console.log(final_interested_payload)

	Promise.all(list_of_promises)
	.then(() => {

		// console.log(final_interested_payload)
		res.status(200).json( final_interested_payload );

	})

})










// get books_list_with_children
// USED
router.get('/books-list-with-children', function(req, res, next){

	Book.
	find().
	limit(10).
	populate('interested_users').
	then((books)=>{
		var newBooks_list = []
		books.map((book, index)=>{
			var newBook = {}

			newBook.book_name = book[ 'book_name' ]
			newBook.book_image = base64_encode( book[ 'book_image' ] )
			newBook.book_description = book[ 'book_description' ]
			newBook.endpoint = book[ 'endpoint' ]

			newBooks_list.push({...newBook})
			newBook = {}
		});

		return newBooks_list
	})

	.then((newBooks_list) => {

		if (!newBooks_list) {

			res.status(401).json({ success: false, msg: "could not find Books_list" });

		} else {

			res.status(200).json(newBooks_list);

		}

	})
	.catch((err) => {

		next(err);

	});

});



























// create a new book with children

router.post('/create-book-with-children', function(req, res, next){
	const newBook = new Book({

		_id: new mongoose.Types.ObjectId(),
		book_name: req.body.parent.book_name,
		book_image: req.body.parent.book_image,
		book_description: req.body.parent.book_description,
		endpoint: req.body.parent.endpoint,

	});

	newBook.save(function (err, newBook) {
		if (err) return console.log(err);




	newBook.save();

	});

});

// find book
	
router.get('/find-book', function(req, res, next){

	Book.findOne({ endpoint: req.body.endpoint })
	.then((book) => {

		book[ book_image ] = base64_encode( book[ 'book_image' ] )

		if (!book) {

			res.status(401).json({ success: false, msg: "could not find book" });

		} else {

			res.status(200).json(book);

		}

	})
	.catch((err) => {

		next(err);

	});

});

// get books_list

router.get('/books-list', function(req, res, next){

Book.
	find().
	limit(10).
	then((books)=>{
		var newBooks_list = []
		books.map((book, index)=>{
			var newBook = {}

			newBook.book_name = book[ 'book_name' ]
			newBook.book_image = base64_encode( book[ 'book_image' ] )
			newBook.book_description = book[ 'book_description' ]
			newBook.endpoint = book[ 'endpoint' ]

			newBooks_list.push({...newBook})
			newBook = {}
		});

		return newBooks_list
	})

	.then((newBooks_list) => {

		if (!newBooks_list) {

			res.status(401).json({ success: false, msg: "could not find Books_list" });

		} else {

			res.status(200).json(newBooks_list);

		}

	})
	.catch((err) => {

		next(err);

	});
});


// get books_list_next_10_with_children

router.get('/books-list-next-10-with-children', function(req, res, next){

	Book.
	find().
	skip(10).
	limit(10).
	populate('interested_users').
	then((books)=>{
		var newBooks_list = []
		books.map((book, index)=>{
			var newBook = {}

			newBook.book_name = book[ 'book_name' ]
			newBook.book_image = base64_encode( book[ 'book_image' ] )
			newBook.book_description = book[ 'book_description' ]
			newBook.endpoint = book[ 'endpoint' ]

			newBooks_list.push({...newBook})
			newBook = {}
		});

		return newBooks_list
	})

	.then((newBooks_list) => {

		if (!newBooks_list) {

			res.status(401).json({ success: false, msg: "could not find Books_list" });

		} else {

			res.status(200).json(newBooks_list);

		}

	})
	.catch((err) => {

		next(err);

	});
});

// get book with children

router.get('/book-with-children', function(req, res, next){
	Book.
		findOne({endpoint:req.body.endpoint}).


		exec(function (err, book_with_children) {
			if (err) return console.log(err);

			res.status(200).json(book_with_children);
		});
})


// get book with summarized children

router.get('/book-with-summarized-children', function(req, res, next){
	Book.
		findOne({endpoint:req.body.endpoint}).


		exec(function (err, blogpost_with_children) {

			if (err) return console.log(err);


		res.status(200).json(book_with_children);

	});
})

// get next 10 books_list

router.get('/books-next-10-list', function(req, res, next){

	Book.
		find().
		limit(10).
		skip(10).
		then( 
			(books) => {
				var newBooks_list = []
				books.map((book, index) => {
					var newBook = {}
	
					newBook.book_name = book[ 'book_name' ]
					newBook.book_image = base64_encode( book[ 'book_image' ] )
					newBook.book_description = book[ 'book_description' ]
					newBook.endpoint = book[ 'endpoint' ]

					newBooks_list.push({...newBook})
					newBook = {}
					})
			})

			return newBooks_list

		.then((newBooks_list) => {

			if (!newBooks_list) {

				res.status(401).json({ success: false, msg: "could not find Books_list" });

			} else {

				res.status(200).json(newBooks_list);

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