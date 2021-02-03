require('./db_settings')
var fs = require('fs');
const mongoose = require('mongoose');

require('../models/book');

const Book = mongoose.model('Book');

const {resolve} = require('path')
require('dotenv').config({path: resolve(__dirname,"../.env")})

Book.deleteMany({}, ()=>null)
