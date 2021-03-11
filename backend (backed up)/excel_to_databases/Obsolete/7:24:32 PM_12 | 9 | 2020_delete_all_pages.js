require('./db_settings')
var fs = require('fs');
const mongoose = require('mongoose');

require('../models/page');

const Page = mongoose.model('Page');

const {resolve} = require('path')
require('dotenv').config({path: resolve(__dirname,"../.env")})

Page.deleteMany({}, ()=>null)
