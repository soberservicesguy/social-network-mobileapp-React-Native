const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var endpoint_number = 393893

const ShareSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,


// other model links
	socialpost:{ type: Schema.Types.ObjectId, ref: 'SocialPost'  },
	user:{ type: Schema.Types.ObjectId, ref: 'User'  },
	// total_socialpost:0,

	endpoint:String,
	timestamp:String,

})

ShareSchema.pre('save', function(next) {

	endpoint_number += 1

	this.endpoint = String( endpoint_number )
	this.timestamp = String( Date.now() )
	
    next();

});

ShareSchema.post('save', function() {

	// console.log('SAVED CONDITION')
    // console.log(this)

});


mongoose.model('Share', ShareSchema);