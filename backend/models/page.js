const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var endpoint_number = 393893

const PageSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,

	page_name:String,
	page_image:String,
	page_description:String,
	endpoint:String,

	page_created_by_user: { type: Schema.Types.ObjectId, ref: 'User'  }, 

// other model links
	interested_users: [{ type: Schema.Types.ObjectId, ref: 'User'  }],

	endpoint:String,
	timestamp:String,

})

PageSchema.pre('save', function(next) {

	endpoint_number += 1

	this.endpoint = String( endpoint_number )
	this.timestamp = String( Date.now() )
	
    next();

});

PageSchema.post('save', function() {

	// console.log('SAVED CONDITION')
    // console.log(this)

});


mongoose.model('Page', PageSchema);