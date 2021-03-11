const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var endpoint_number = 393893

const AdvertisementSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,

	ad_name:String,
	ad_image:String,
	ad_description:String,

	ad_uploaded_by_user: { type: Schema.Types.ObjectId, ref: 'User'},

	endpoint:String,
	timestamp:String,

// other model links

})

	
AdvertisementSchema.pre('save', function(next) {

	endpoint_number += 1

	this.endpoint = String( endpoint_number )
	this.timestamp = String( Date.now() )
	
    next();

});

AdvertisementSchema.post('save', function() {

	// console.log('SAVED CONDITION')
    // console.log(this)

});

mongoose.model('Advertisement', AdvertisementSchema);