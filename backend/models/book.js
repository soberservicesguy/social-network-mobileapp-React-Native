const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var endpoint_number = 393893

const BookSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,

	book_name:String,
	book_image:String,
	book_description:String,
	endpoint:String,

	book_uploaded_by_user: { type: Schema.Types.ObjectId, ref: 'User'},

// other model links
	interested_users: [{ type: Schema.Types.ObjectId, ref: 'User'  }],

	endpoint:String,
	timestamp:String,

})

BookSchema.pre('save', function(next) {

	endpoint_number += 1

	this.endpoint = String( endpoint_number )
	this.timestamp = String( Date.now() )
	
    next();

});

BookSchema.post('save', function() {

	// console.log('SAVED CONDITION')
    // console.log(this)

});

mongoose.model('Book', BookSchema);
