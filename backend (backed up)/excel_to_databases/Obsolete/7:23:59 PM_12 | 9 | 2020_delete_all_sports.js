require('./db_settings')
var fs = require('fs');
const mongoose = require('mongoose');

require('../models/sport');

const Sport = mongoose.model('Sport');

const {resolve} = require('path')
require('dotenv').config({path: resolve(__dirname,"../.env")})

Sport.deleteMany({}, ()=>null)
