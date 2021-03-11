
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrivilegeSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,
	
	privilege_name:{ type:String, enum:[
		'admin_control', 
		'allow_surfing', 
		'allow_interacting_with_others_post', 
		'allow_post_creating',
		
		'allow_ad_creating',
		'allow_book_creating',
		'allow_page_creating',
		'allow_sport_creating',
	]},
	
	total_users:0,

// other model links
	users:[{ type: Schema.Types.ObjectId, ref: 'User'  }],

})

mongoose.model('Privilege', PrivilegeSchema);
	
PrivilegeSchema.pre('save', function(next) {

	this.total_users = this.users.length
    next();

});