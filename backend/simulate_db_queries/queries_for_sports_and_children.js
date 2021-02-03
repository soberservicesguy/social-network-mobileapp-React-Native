
const mongoose = require('mongoose');
require('dotenv').config();

require('../models/socialpost');
require('../models/comment');
require('../models/like');
require('../models/share');
require('../models/user');
require('../models/advertisement');
require('../models/page');
require('../models/book');
require('../models/sport');
const SocialPost = mongoose.model('SocialPost');
const Comment = mongoose.model('Comment');
const Like = mongoose.model('Like');
const Share = mongoose.model('Share');
const User = mongoose.model('User');
const Advertisement = mongoose.model('Advertisement');
const Page = mongoose.model('Page');
const Book = mongoose.model('Book');
const Sport = mongoose.model('Sport');

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the '.env' file.  To implement this, place the following
 * string into the '.env' file
 * 
 * DB_STRING=mongodb://localhost:27017/database_name
 * DB_STRING_PROD=<your production database string>
 */ 

const devConnection = process.env.DB_STRING;
const prodConnection = process.env.DB_STRING_PROD;

// Connect to thae correct environment database
if (process.env.NODE_ENV === 'production') {
    mongoose.connect(prodConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
        console.log('Database connected');
    });

} else {

    mongoose.connect(devConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
        console.log('Database connected');
    });
}


SocialPost.
	find()
	.then((socialposts) => {

		if (!socialposts) {

		    console.log('no socialposts exist')

		} else {

		    console.log('Number of socialposts are', socialposts.length)
		    console.log('socialposts are', socialposts)

		}
	})
	.catch((err) => {
		console.log(err)
});




Comment.
	find()
	.then((comments) => {

		if (!comments) {

		    console.log('no comments exist')

		} else {

		    console.log('Number of comments are', comments.length)
		    console.log('comments are', comments)

		}
	})
	.catch((err) => {
		console.log(err)
});




Like.
	find()
	.then((likes) => {

		if (!likes) {

		    console.log('no likes exist')

		} else {

		    console.log('Number of likes are', likes.length)
		    console.log('likes are', likes)

		}
	})
	.catch((err) => {
		console.log(err)
});




Share.
	find()
	.then((shares) => {

		if (!shares) {

		    console.log('no shares exist')

		} else {

		    console.log('Number of shares are', shares.length)
		    console.log('shares are', shares)

		}
	})
	.catch((err) => {
		console.log(err)
});




User.
	find()
	.then((users) => {

		if (!users) {

		    console.log('no users exist')

		} else {

		    console.log('Number of users are', users.length)
		    console.log('users are', users)

		}
	})
	.catch((err) => {
		console.log(err)
});




Advertisement.
	find()
	.then((advertisements) => {

		if (!advertisements) {

		    console.log('no advertisements exist')

		} else {

		    console.log('Number of advertisements are', advertisements.length)
		    console.log('advertisements are', advertisements)

		}
	})
	.catch((err) => {
		console.log(err)
});




Page.
	find()
	.then((pages) => {

		if (!pages) {

		    console.log('no pages exist')

		} else {

		    console.log('Number of pages are', pages.length)
		    console.log('pages are', pages)

		}
	})
	.catch((err) => {
		console.log(err)
});




Book.
	find()
	.then((books) => {

		if (!books) {

		    console.log('no books exist')

		} else {

		    console.log('Number of books are', books.length)
		    console.log('books are', books)

		}
	})
	.catch((err) => {
		console.log(err)
});




Sport.
	find()
	.then((sports) => {

		if (!sports) {

		    console.log('no sports exist')

		} else {

		    console.log('Number of sports are', sports.length)
		    console.log('sports are', sports)

		}
	})
	.catch((err) => {
		console.log(err)
});



// showing socialpost and populating children

SocialPost.
	find(). 

	populate('Comment').
	populate('Like').
	populate('Share').
	populate('User').

	exec(function (err, socialposts) {

	    if (err){
	      console.log('ERROR', err);
	    } 

	    console.log('socialpost is %s', socialposts)		// console.log('The comments %s', socialpost.comments);
		// console.log('The likes %s', socialpost.likes);
		// console.log('The shares %s', socialpost.shares);
		// console.log('The users %s', socialpost.users);
});// showing advertisement and populating children

Advertisement.
	find(). 


	exec(function (err, advertisements) {

	    if (err){
	      console.log('ERROR', err);
	    } 

	    console.log('advertisement is %s', advertisements)});// showing page and populating children

Page.
	find(). 


	exec(function (err, pages) {

	    if (err){
	      console.log('ERROR', err);
	    } 

	    console.log('page is %s', pages)});// showing book and populating children

Book.
	find(). 


	exec(function (err, books) {

	    if (err){
	      console.log('ERROR', err);
	    } 

	    console.log('book is %s', books)});// showing sport and populating children

Sport.
	find(). 


	exec(function (err, sports) {

	    if (err){
	      console.log('ERROR', err);
	    } 

	    console.log('sport is %s', sports)});