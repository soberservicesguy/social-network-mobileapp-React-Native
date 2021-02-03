const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var endpoint_number = 393893

const SportSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,

	sport_name:String,
	sport_image:String,
	sport_description:String,


// other model links
	interested_users: [{ type: Schema.Types.ObjectId, ref: 'User'  }],
	sport_created_by_user:{ type: Schema.Types.ObjectId, ref: 'User'  },

	endpoint:String,
	timestamp:String,
})

SportSchema.pre('save', function(next) {

	endpoint_number += 1

	this.endpoint = String( endpoint_number )
	this.timestamp = String( Date.now() )

    next();

});

SportSchema.post('save', function() {

	// console.log('SAVED CONDITION')
    // console.log(this)

});



mongoose.model('Sport', SportSchema);
