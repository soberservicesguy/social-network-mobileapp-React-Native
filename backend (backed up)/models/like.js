const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var endpoint_number = 393893

const LikeSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,
	user:{ type: Schema.Types.ObjectId, ref: 'User'  },

// other model links
	socialpost:{ type: Schema.Types.ObjectId, ref: 'SocialPost'  },
	// page: { type: Schema.Types.ObjectId, ref: 'Page'  },
	// book: { type: Schema.Types.ObjectId, ref: 'Book'  },
	// sport: { type: Schema.Types.ObjectId, ref: 'Sport'  },


	endpoint:String,
	timestamp:String,

})

LikeSchema.pre('save', function(next) {

	endpoint_number += 1

	this.endpoint = String( endpoint_number )
	this.timestamp = String( Date.now() )
	
    next();

});

LikeSchema.post('save', function() {

	// console.log('SAVED CONDITION')
    // console.log(this)

});

mongoose.model('Like', LikeSchema);