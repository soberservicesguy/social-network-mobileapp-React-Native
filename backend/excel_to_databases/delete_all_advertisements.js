require('./db_settings')
var fs = require('fs');
const mongoose = require('mongoose');

require('../models/advertisement');

const Advertisement = mongoose.model('Advertisement');

const {resolve} = require('path')
require('dotenv').config({path: resolve(__dirname,"../.env")})


function bulk_delete_all_advertisements(){
	Advertisement.deleteMany({}, ()=>null)
}


module.exports = bulk_delete_all_advertisements