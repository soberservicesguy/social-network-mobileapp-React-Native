
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SocialPostSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,

	type_of_post:String,
	post_text:String,
	image_for_post:String,
	video_for_post:String,
	video_thumbnail_image:String,
	total_likes:String,
	total_shares:String,
	endpoint:String,
	date_of_publishing:String,

// other model links
	comments:[{ type: Schema.Types.ObjectId, ref: 'Comment' }],
	likes:[{ type: Schema.Types.ObjectId, ref: 'Like' }],
	shares:[{ type: Schema.Types.ObjectId, ref: 'Share' }],
	user:{ type: Schema.Types.ObjectId, ref: 'User' },
	total_comments:0,
	total_likes:0,
	total_shares:0,

})

mongoose.model('SocialPost', SocialPostSchema);
	
SocialPostSchema.pre('save', function(next) {
	this.total_comments = this.comments.length
	this.total_likes = this.likes.length
	this.total_shares = this.shares.length

    next();

});
