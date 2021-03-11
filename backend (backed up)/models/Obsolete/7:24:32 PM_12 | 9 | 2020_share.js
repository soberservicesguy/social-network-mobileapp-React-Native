
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShareSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,


// other model links
	socialpost:{ type: Schema.Types.ObjectId, ref: 'SocialPost'  },
	user:{ type: Schema.Types.ObjectId, ref: 'User'  },
	total_socialpost:0,

})

mongoose.model('Share', ShareSchema);