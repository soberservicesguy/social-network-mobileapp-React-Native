require('./db_settings')
var fs = require('fs');
const mongoose = require('mongoose');

require('../models/sport');

const User = mongoose.model('User');

const {resolve} = require('path')
require('dotenv').config({path: resolve(__dirname,"../.env")})




function delete_all_user(){
	User.deleteMany({}, ()=>null)
}


module.exports = delete_all_user