const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var endpoint_number = 393893

const ActivitySchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,
	user: { type: Schema.Types.ObjectId, ref: 'User'},
	activity_type: { type:String, enum:[
		'created_post', 'liked_post', 'shared_post', 'commented_on_post', 
		'sent_friend_request', 'accepted_friend_request',
		'created_book', 'got_interested_in_book',
		'created_page', 'got_interested_in_book',
		'created_sport', 'got_interested_in_sport',
		'created_advertisement', 'got_interested_in_advertisement',
	]},
//
	post_created: { type: Schema.Types.ObjectId, ref: 'Social_Post', default:null },
	post_liked: { type: Schema.Types.ObjectId, ref: 'Like', default:null },
	post_share: { type: Schema.Types.ObjectId, ref: 'Share', default:null },
	post_commented: { type: Schema.Types.ObjectId, ref: 'Comment', default:null },

	sent_friend_request: { type: Schema.Types.ObjectId, ref: 'User', default:null },
	accepted_friend_request: { type: Schema.Types.ObjectId, ref: 'User', default:null },

	sport_created: { type: Schema.Types.ObjectId, ref: 'Sport', default:null },
	sport_liked: { type: Schema.Types.ObjectId, ref: 'Sport', default:null },

	page_created: { type: Schema.Types.ObjectId, ref: 'Page', default:null },
	page_liked: { type: Schema.Types.ObjectId, ref: 'Page', default:null },

	book_created: { type: Schema.Types.ObjectId, ref: 'Book', default:null },
	book_liked: { type: Schema.Types.ObjectId, ref: 'Book', default:null },

	ad_created: { type: Schema.Types.ObjectId, ref: 'Advertisement', default:null },
	ad_liked: { type: Schema.Types.ObjectId, ref: 'Advertisement', default:null },

	endpoint:String,
	timestamp:String,

})

ActivitySchema.pre('save', function(next) {

	endpoint_number += 1

	this.endpoint = String( endpoint_number )
	this.timestamp = String( Date.now() )
	
    next();

});

ActivitySchema.post('save', function() {

	// console.log('SAVED CONDITION')
    // console.log(this)

});


mongoose.model('Activity', ActivitySchema);