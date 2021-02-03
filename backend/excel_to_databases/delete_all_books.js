require('./db_settings')
var fs = require('fs');
const mongoose = require('mongoose');

require('../models/book');

const Book = mongoose.model('Book');

const {resolve} = require('path')
require('dotenv').config({path: resolve(__dirname,"../.env")})


function bulk_delete_all_books(){
	Book.deleteMany({}, ()=>null)
}


module.exports = bulk_delete_all_books