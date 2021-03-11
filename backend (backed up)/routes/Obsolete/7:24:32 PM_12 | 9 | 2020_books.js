require('../models/book');


const base64_encode = require('../lib/image_to_base64')
const mongoose = require('mongoose');
const router = require('express').Router();
const Book = mongoose.model('Book');

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

// get books_list_with_children

router.get('/books-list-with-children', function(req, res, next){

	Book.
		find().
		limit(10).
		populate('comments').
		populate('likes').
		populate('shares').
		populate('user').
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
		populate('comments').
		populate('likes').
		populate('shares').
		populate('user').
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