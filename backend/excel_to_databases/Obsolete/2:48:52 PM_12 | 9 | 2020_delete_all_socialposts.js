require('./db_settings')
var fs = require('fs');
const mongoose = require('mongoose');

require('../models/socialpost');
require('../models/comment');
require('../models/like');
require('../models/share');
require('../models/user');

const SocialPost = mongoose.model('SocialPost');
const Comment = mongoose.model('Comment');
const Like = mongoose.model('Like');
const Share = mongoose.model('Share');
const User = mongoose.model('User');

const {resolve} = require('path')
require('dotenv').config({path: resolve(__dirname,"../.env")})

SocialPost.deleteMany({}, ()=>null)
Comment.deleteMany({}, ()=>null)
Like.deleteMany({}, ()=>null)
Share.deleteMany({}, ()=>null)
User.deleteMany({}, ()=>null)
