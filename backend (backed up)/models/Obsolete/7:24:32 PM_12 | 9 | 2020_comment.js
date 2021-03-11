
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,

	comment_text:String,
	date_of_publishing:String,

// other model links
	socialpost:{ type: Schema.Types.ObjectId, ref: 'SocialPost'  },
	user:{ type: Schema.Types.ObjectId, ref: 'User'  },
	total_socialpost:0,

})

mongoose.model('Comment', CommentSchema);