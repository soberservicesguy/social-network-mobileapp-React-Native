
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdvertisementSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,

	ad_name:String,
	ad_image:String,
	ad_description:String,
	endpoint:String,

// other model links

})

mongoose.model('Advertisement', AdvertisementSchema);
	
AdvertisementSchema.pre('save', function(next) {

    next();

});
