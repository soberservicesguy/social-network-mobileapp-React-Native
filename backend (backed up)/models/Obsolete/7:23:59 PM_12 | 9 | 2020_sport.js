
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SportSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,

	sport_name:String,
	sport_image:String,
	sport_description:String,
	endpoint:String,

// other model links

})

mongoose.model('Sport', SportSchema);
	
SportSchema.pre('save', function(next) {

    next();

});
